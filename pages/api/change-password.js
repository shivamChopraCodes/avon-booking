// import { Pri } from "../../.db";
const bcrypt = require('bcryptjs');
import { PrismaClient } from '@prisma/client';
import { confirmPasswordHash } from './auth/[...nextauth]';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === 'POST') {
    const { email, token, password } = JSON.parse(req.body);
    try {
      const tokenValid = await prisma.otp.findFirst({
        where: {
          email,
          token,
        },
        select: {
          email: true,
          token: true,
          expiry: true,
        },
      });
      if (!tokenValid) return res.status(401).json({ error: `Invalid OTP.` });
      const isTokenExpired = new Date().getTime > +tokenValid.expiry;
      if (isTokenExpired) return res.status(401).json({ error: `OTP has expired.` });
      const lastPassword = await prisma.signupagent.findFirst({
        where: {
          email,
        },
        select: {
          password: true,
        },
      });
      if (await confirmPasswordHash(password, lastPassword.password))
        return res.status(400).json({ error: `Password can not be same as last password.` });
      await prisma.otp.delete({
        where: {
          email,
        },
      });
      const changePassword = await prisma.signupagent.update({
        where: {
          email,
        },
        data: {
          password: bcrypt.hashSync(password, 10),
        },
      });
      if (!changePassword) return res.status(400).json({ error: `Unable to change password.` });
      return res.status(200).json({ message: 'Password changed succesfully.' });
    } catch (err) {
      console.log(err);
      res.status(401);
      res.json({ error: `Unable to send OTP.` });
      return;
    }
  }
}
