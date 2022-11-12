// import { Pri } from "../../.db";

import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === 'GET') {
    const cities = await prisma.city.findMany({
      where: {
        hiddenshow: 'Show',
      },
      select: {
        idcity: true,
        cityname: true,
        countryname: true,
      },
    });
    return res.send(cities);
  }
}
