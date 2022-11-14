// import { Pri } from "../../.db";

import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === 'GET') {
    const best_tour = await prisma.besttour.findMany({
      where: {
        hiddenshow: 'Show',
      },
    });

    // const amazing_deals = await prisma.amazingdeals.findMany({
    //   where: {
    //     hiddenshow: 'Show',
    //   },
    // });

    // const weekly_specials = await prisma.weeklyspecial.findMany({
    //   where: {
    //     hiddenshow: 'Show',
    //   },
    // });
    const updateLogo = await prisma.flightdetails.findFirst({
      where: {
        hiddenshow: 'Show',
        company: 'BRITISH AIRWAYS',
      },
    });
    const data = {
      best_tour,
      // amazing_deals,
      // weekly_specials,
      updateLogo,
    };
    return res.send(data);
  }
  if (req.method === 'POST') {
    const body = req.body;
    console.log(body);
    // const update = await prisma.besttour.createMany({
    //   data: [
    //     {
    //       image: '/images/flight-offer01.png',
    //       //   flightImg: '/images/thaiAir.jpeg',
    //       flightcompany: 'THAI AIR',
    //       text: 'Flash Sale! Upto 25% off',
    //       hiddenshow: 'Show',
    //     },
    //     {
    //       image: '/images/flight-offer02.png',
    //       //   flightImg: '/images/vistara.jpeg',
    //       flightcompany: 'VISTARA',
    //       text: 'Abu Dhabi to New Delhi',
    //       hiddenshow: 'Show',
    //     },
    //     {
    //       image: '/images/flight-offer03.png',
    //       //   flightImg: '/images/spicejet.jpeg',
    //       flightcompany: 'SPICEJET',
    //       text: 'New York to New Delhi',
    //       hiddenshow: 'Show',
    //     },
    //     {
    //       image: '/images/flight-offer04.png',
    //       //   flightImg: '/images/airasia.jpeg',
    //       flightcompany: 'AIRASIA',
    //       text: 'Australia to New Delhi',
    //       hiddenshow: 'Show',
    //     },
    //     {
    //       image: '/images/flight-offer05.png',
    //       //   flightImg: '/images/6E.jpeg',
    //       flightcompany: 'INDIGO',
    //       text: 'Australia to New Delhi',
    //       hiddenshow: 'Show',
    //     },
    //   ],
    // });
    const updateLogo = await prisma.flightdetails.createMany({
      data: [
        {
          logo: Buffer.from(body),
          company: 'TEST',
          hiddenshow: 'Show',
        },
        // {
        //   logo: body.data[1],
        //   company: 'VISTARA',
        //   hiddenshow: 'Show',
        // },
        // {
        //   logo: body.data[2],
        //   company: 'SPICEJET',
        //   hiddenshow: 'Show',
        // },
        // {
        //   logo: body.data[3],
        //   company: 'AIRASIA',
        //   hiddenshow: 'Show',
        // },
        // {
        //   logo: body.data[4],
        //   company: 'INDIGO',
        //   hiddenshow: 'Show',
        // },
      ],
    });
    return res.status(200).send({ messgae: 'success' });
  }
}
