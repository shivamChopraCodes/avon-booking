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

export default function bookflight(req, res) {
  // split out password from user details
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      console.log(fields, files, Object.keys(files));
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
        user = await prisma.booknow.create({
          data: {
            ...fields,
            ...filesConverted,
            hiddenshow: 'Show',
            basicfare: +fields.basicfare,
            totalfare: +fields.totalfare,
            ...(fields.idagent && { idagent: +fields.idagent }),
            ...(fields.idstaff && { idstaff: +fields.idstaff }),
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
