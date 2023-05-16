// pages/api/generate-metadata.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface FileMetadata {
  extension: string;
  fileName: string;
  author: [string, string, string];
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const publicDir = path.join(process.cwd(), 'public');
  const nodeContentsPath = path.join(publicDir, 'nodeContents.json');

  const metadata: FileMetadata[] = [];

  // Loop through files in the public directory
  fs.readdirSync(publicDir).forEach((file) => {
    const extension = path.extname(file).replace('.', '');
    const fileName = path.basename(file);

    const author: [string, string, string] = ['Liam Arbuckle', '0009-0000-9139-5148', 'DeSci Labs'];

    metadata.push({
      extension,
      fileName,
      author,
    });
  });

  // Write metadata to nodeContents.json
  fs.writeFileSync(nodeContentsPath, JSON.stringify(metadata, null, 2));

  console.log('nodeContents.json created successfully.');

  res.status(200).json({ message: 'Metadata generated successfully.' });
}
