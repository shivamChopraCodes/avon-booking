// import { Pri } from "../../.db";

import { PrismaClient } from '@prisma/client';
import { sendEmail } from '../../src/service/aws-ses';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === 'POST') {
    const { email, signup, userName } = JSON.parse(req.body);
    try {
      console.log({ email, signup });
      if (signup) {
        const otp = Math.floor(Math.random() * 899999 + 100000);
        const expiry = new Date(new Date().getTime() + 10 * 60 * 1000).getTime();
        const saveToken = await prisma.otp.upsert({
          where: {
            email,
          },
          update: {
            token: `${otp}`,
            expiry: `${expiry}`,
          },
          create: {
            email,
            token: `${otp}`,
            expiry: `${expiry}`,
          },
        });
        if (saveToken) {
          const emailData = {
            userEmail: 'cvam1112010@gmail.com,mhtgrg38@gmail.com',
            subject: 'OTP for signup',
            body: `
                            <p>
                            Hi ${userName},<br/><br/>
                            Your OTP for signup request is: <strong>${otp}</strong>. This OTP is valid for next 10 minutes.
                            </p>`,
          };
          const email = await sendEmail({ ...emailData });
          if (!email.ok) {
            return res.status(400).json({ message: 'Unable to generate OTP.' });
          }
          return res.status(200).json({ message: 'An OTP has been sent to your email address succesfully.' });
        }
      } else {
        const userExists = await prisma.signupagent.findFirst({
          where: {
            showhidden: 'Show',
            email: email,
          },
          select: {
            email: true,
            username: true,
          },
        });
        if (!userExists) return res.status(401).json({ error: `User not found. Please sign up.` });
        const otp = Math.floor(Math.random() * 899999 + 100000);
        const expiry = new Date(new Date().getTime() + 10 * 60 * 1000).getTime();
        const saveToken = await prisma.otp.upsert({
          where: {
            email,
          },
          update: {
            token: `${otp}`,
            expiry: `${expiry}`,
          },
          create: {
            email,
            token: `${otp}`,
            expiry: `${expiry}`,
          },
        });
        if (saveToken) {
          const emailData = {
            userEmail: 'cvam1112010@gmail.com,mhtgrg38@gmail.com',
            subject: 'OTP for password change',
            body: `
                            <p>
                            Hi ${userExists.username},<br/><br/>
                            Your OTP for password change request is:<strong>${otp}</strong>. This OTP is valid for next 10 minutes.
                            </p>`,
          };
          const email = await sendEmail({ ...emailData });
          if (!email.ok) {
            return res.status(400).json({ message: 'Unable to generate OTP.' });
          }
        }
        return res.status(200).json({ message: 'An OTP has been sent to your email address succesfully.' });
      }
    } catch (err) {
      console.log(err);
      res.status(401);
      res.json({ error: `Unable to send OTP.` });
      return;
    }
  }
}
