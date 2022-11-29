// import { Pri } from "../../.db";

import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === 'GET') {
    const {
      query: { startDate, endDate, departure, arrival, type, occupants, skip, flightId },
    } = req;
    if (flightId) {
      const flightDetails = await prisma.inventory.findFirst({
        where: {
          hiddenshow: 'Show',
          idinventory: +flightId,
        },
      });
      const logo = await prisma.flightdetails.findFirst({
        where: {
          company: flightDetails.flightcompany,
          hiddenshow: 'Show',
        },
        select: {
          logo: true,
        },
      });
      const data = {
        flightDetails,
        logo,
      };
      return res.send(data);
    } else {
      const totalCount = await prisma.inventory.count({
        where: {
          hiddenshow: 'Show',
          departuredate: {
            lte: endDate,
            gte: startDate,
          },
          nameofarrivalcity: arrival,
          nameofdeparturecity: departure,
          numberofseats: {
            gte: occupants,
          },
        },
      });
      const flights = await prisma.$queryRaw`SELECT idinventory,
     flightcompany,
     departuredate,
     departuretime,
     arrivaldate,
     arrivaltime,
     flightduration,
     flightnumber,
     cost,
     flightdetails.logo
      FROM inventory 
     JOIN flightdetails ON flightdetails.company = inventory.flightcompany
     WHERE inventory.hiddenshow = 'Show'
     AND inventory.departuredate BETWEEN ${startDate} and ${endDate}
     AND inventory.nameofdeparturecity = ${departure}
     AND inventory.nameofarrivalcity = ${arrival}
     AND inventory.numberofseats >= ${occupants}
     ORDER BY inventory.departuredate DESC
     LIMIT ${skip || 0}, 4
     `;

      // const flights = await prisma.inventory.findMany({
      //   where: {
      //     hiddenshow: 'Show',
      //   },
      //   include: {
      //     flightdetails: {
      //       company: true,
      //     },
      //   },
      //   select: {
      //     idinventory: true,
      //     flightcompany: true,
      //     departuredate: true,
      //     departuretime: true,
      //     arrivaldate: true,
      //     arrivaltime: true,
      //     flightduration: true,
      //     cost: true,

      //   },
      // });
      const data = {
        totalCount,
        flights,
      };
      return res.send(data);
    }
  }
  if (req.method === 'POST') {
  }
}
