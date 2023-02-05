// import { Pri } from "../../.db";

import { PrismaClient } from '@prisma/client';
import { sendEmail } from '../../src/service/aws-ses';

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
      const emailData = {
        userEmail: 'cvam1112010@gmail.com,mhtgrg38@gmail.com',
        subject: 'New enquiry',
        body: `
        <p>Details of a new enquyiry are below:</p><br />
        <p>Name: ${name}</p><br />
        <p>Email: ${email}</p><br />
        <p>Phone: ${phone}</p><br />
        <p>Message: ${message}</p><br />
        `,
      };
      await sendEmail({ ...emailData });
      return res.status(200).json({ message: 'Enquiry Submitted. We will get back to you shortly.' });
    } catch (err) {
      console.log(err);
      res.status(401);
      res.json({ error: `Enquiry failed. Please try again later.` });
      return;
    }
  }
}
