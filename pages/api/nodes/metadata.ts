import { NextApiRequest, NextApiResponse } from 'next';
import metadata from '@/public/nodeContents.json'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { fileName } = req.body;

  const fileMetadata = metadata.find((item) => item.fileName === fileName);

  if (fileMetadata) {
    res.status(200).json(fileMetadata);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
};