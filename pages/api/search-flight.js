// import { Pri } from "../../.db";

import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === 'GET') {
    const totalCount = await prisma.inventory.count({
      where: {
        hiddenshow: 'Show',
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
     WHERE inventory.hiddenshow = 'Show'`;

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