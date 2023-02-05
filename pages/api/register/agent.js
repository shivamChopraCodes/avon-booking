const bcrypt = require('bcryptjs');
import fs from 'fs';
import formidable from 'formidable';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    console.log(fields, files, Object.keys(files));
    // Object.keys(files)
    // await saveFile(files.image);
    return res.status(200).send('');
  });
};

const saveFile = async (file) => {
  if (!file) return null;
  const data = fs.readFileSync(file.filepath);
  const buf = Buffer.from(data);
  await fs.unlinkSync(file.filepath);
  return buf;
  //   return;
};

export default function register(req, res) {
  // split out password from user details
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      console.log(fields, files, Object.keys(files));
      try {
        const tokenValid = await prisma.otp.findFirst({
          where: {
            email: fields.email,
            token: fields.token,
          },
          select: {
            expiry: true,
          },
        });
        if (!tokenValid) return res.status(401).json({ error: `Invalid OTP.` });
        const isTokenExpired = new Date().getTime > +tokenValid.expiry;
        if (isTokenExpired) return res.status(401).json({ error: `OTP has expired.` });
      } catch (err) {
        return res.status(405).json({ message: 'Unable to verify OTP', success: false });
      }
      const filesArray = await Promise.all([
        ...Object.entries(files).map(async ([key, value]) => {
          return {
            [key]: await saveFile(value),
          };
        }),
      ]);
      const filesConverted = filesArray.reduce((result, currentObj) => ({ ...result, ...currentObj }), {});
      let user;
      console.log(filesConverted);

      try {
        user = await prisma.signupagent.create({
          data: {
            username: fields.userName,
            agencyname: fields.agencyName,
            agencyaddress1: fields.agencyAddress1,
            agencyaddress2: fields.agencyAddress2,
            citytown: fields.city,
            state: fields.state,
            pin: fields.pin,
            mobile: fields.phone,
            whatsappnumber: fields.whatsappNumber,
            email: fields.email,
            contactperson: fields.contactPerson,
            designation: fields.designation,
            pangirnumber: filesConverted.pan_gir_number,
            adharcardnopassport: filesConverted.aadhar_passport,
            ...(filesConverted.gst_number && { gstnumber: filesConverted.gst_number }),
            visitingcard: filesConverted.visitingCard,
            tannumber: filesConverted.tanNumber,
            password: bcrypt.hashSync(fields.password, 10),
            showhidden: 'Show',
            status: 'Pending',
            adminid: '2',
            datetime: new Date().toISOString().split('T')[0],
            adminstaffagent: 'Agent',
          },
        });
        await prisma.otp.delete({
          where: {
            email: fields.email,
          },
        });
        return res.status(200).json({});
      } catch (e) {
        console.log(e);
        res.status(401);
        res.json({ error: 'User already exists' });
        return;
      }

      // await saveFile(files.image);
    });
    // const { password, ...user } = req.body;

    // // validate
    // if (usersRepo.find((x) => x.username === user.username))
    //   throw `User with the username "${user.username}" already exists`;

    // // hash password
    // user.hash = bcrypt.hashSync(password, 10);

    // usersRepo.create(user);
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }
}
