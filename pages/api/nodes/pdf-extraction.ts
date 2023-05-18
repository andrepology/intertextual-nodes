import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const pdfFiles = ['sample.pdf', 'example.pdf']; // Add your PDF file names here or fetch dynamically

  res.status(200).json(pdfFiles);
}