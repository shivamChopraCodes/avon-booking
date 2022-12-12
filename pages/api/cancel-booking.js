// import { Pri } from "../../.db";

import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === 'POST') {
    const { idbooknow } = JSON.parse(req.body);
    console.log({ idbooknow }, req.body.idbooknow);
    try {
      await prisma.booknow.update({
        where: {
          idbooknow: +idbooknow,
        },
        data: {
          status: 'Cancelled',
        },
      });
      return res.status(200).json({ message: 'Operation Successful' });
    } catch (err) {
      console.log(err);
      res.status(401);
      res.json({ error: `Operation Failed ` });
      return;
    }
  }
}
