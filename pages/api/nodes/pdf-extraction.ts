import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import pdf from 'pdf-parse';

const extractContentsFromPdf = async (pdfPath: string): Promise<string> => {
  const pdfData = fs.readFileSync(pdfPath);

  const pdfResult = await pdf(pdfData);
  const extractedContents = pdfResult.text;

  return extractedContents;
};

const getAllPdfFiles = (dir: string): string[] => {
  const files = fs.readdirSync(dir);
  let pdfFiles: string[] = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      pdfFiles = pdfFiles.concat(getAllPdfFiles(filePath));
    } else if (path.extname(file) === '.pdf') {
      pdfFiles.push(filePath);
    }
  });

  return pdfFiles;
};

const PdfsApiHandler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const pdfFiles = getAllPdfFiles(publicDir);

    const contentsPromises = pdfFiles.map((pdfFile) =>
      extractContentsFromPdf(pdfFile)
    );
    const pdfContents = await Promise.all(contentsPromises);

    res.status(200).json(pdfContents);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch PDF contents' });
  }
};

export default PdfsApiHandler;