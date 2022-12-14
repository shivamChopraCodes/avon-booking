// import { Pri } from "../../.db";

import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === 'POST') {
    const { email, name, phone, message, createdat } = JSON.parse(req.body);
    try {
      await prisma.enquiry.create({
        data: {
          name,
          email,
          message,
          phone,
          createdat,
        },
      });
      return res.status(200).json({ message: 'Enquiry Submitted. We will get back to you shortly.' });
    } catch (err) {
      console.log(err);
      res.status(401);
      res.json({ error: `Enquire failed. Please try again later.` });
      return;
    }
  }
}
