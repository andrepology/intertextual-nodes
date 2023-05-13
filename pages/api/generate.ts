import { NextApiHandler } from 'next';
import { createReadStream } from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const form = new FormData();
    const pdfStream = createReadStream(req.body.pdf.path);
    form.append('pdf', pdfStream, { filename: req.body.pdf.name });

    try {
      const response = await fetch('http://127.0.0.1:8000/generate', {
        method: 'POST',
        body: form,
        headers: form.getHeaders(),
      });
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
