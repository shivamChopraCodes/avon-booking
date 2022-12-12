// import { Pri } from "../../.db";

import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === 'GET') {
    const {
      query: { skip, idagent, idstaff, rows },
    } = req;
    const totalCount = await prisma.booknow.count({
      where: {
        hiddenshow: 'Show',
        ...(idagent && {
          idagent: +idagent,
        }),
        ...(idstaff && {
          idstaff: +idstaff,
        }),
      },
    });
    const flightBooked = await prisma.booknow.findMany({
      where: {
        hiddenshow: 'Show',
        ...(idagent && {
          idagent: +idagent,
        }),
        ...(idstaff && {
          idstaff: +idstaff,
        }),
      },
      orderBy: [
        {
          createdat: 'desc',
        },
      ],
      skip: +skip,
      take: +rows,
      select: {
        idbooknow: true,
        refnummberp: true,
        cabinp: true,
        flightnumber: true,
        pnr: true,
        duration: true,
        createdat: true,
        updatedat: true,
        tax: true,
        discount: true,
        discountcoupon: true,
        basicfare: true,
        totalfare: true,
        netfare: true,
        arrival: true,
        aircraft: true,
        departure: true,
        dateoftravel: true,
        title: true,
        firstnamep: true,
        lastnamep: true,
        typep: true,
        genderp: true,
        status: true,
        departureterminal: true,
        arrivalterminal: true,
        inventory: {
          select: {
            flightcompany: true,
            departuredate: true,
            arrivaldate: true,
            departureairpot: true,
            departuretime: true,
            arrivalairpot: true,
            arrivaltime: true,
          },
        },
      },
    });
    const allCompanies = flightBooked.reduce((result, current) => {
      if (!result[current.inventory.flightcompany]) {
        result = {
          ...result,
          [current.inventory.flightcompany]: true,
        };
      }
      return result;
    }, {});
    const uniqueCompanies = Object.keys(allCompanies).map((company) => ({ company }));
    const flight_details = await prisma.flightdetails.findMany({
      where: {
        hiddenshow: 'Show',
        OR: [...uniqueCompanies],
      },
    });
    const logos = flight_details.reduce(
      (result, current) => ({
        ...result,
        [current.company]: current.logo,
      }),
      []
    );
    return res.send({ flightBooked, totalCount, logos });
  }
}
