// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import formidable from 'formidable';
const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) { 
    console.log(files);
    await saveFile(files.image);
    return res.status(200).send('');
  });
};

const saveFile = async (file) => {
  const data = fs.readFileSync(file.filepath);
  const buf = Buffer.from(data);
  const updateLogo = await prisma.flightdetails.createMany({
    data: [
      {
        logo: buf,
        company: 'TEST',
        hiddenshow: 'Show',
      },
    ],
  });
  await fs.unlinkSync(file.filepath);
  return;
};

export default (req, res) => {
  req.method === 'POST'
    ? post(req, res)
    : req.method === 'PUT'
    ? console.log('PUT')
    : req.method === 'DELETE'
    ? console.log('DELETE')
    : req.method === 'GET'
    ? console.log('GET')
    : res.status(404).send('');
};
