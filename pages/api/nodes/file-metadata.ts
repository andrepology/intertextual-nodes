import { NextApiRequest, NextApiResponse } from 'next';
import FileMetadataGenerator from '@/components/drive/metadataReader';

export default { }
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { fileName } = req.body;
//     const metadata = FileMetadataGenerator.getFileMetadata(fileName); // Replace with your own metadata generation logic
//     res.status(200).json(metadata);
//   } catch (error) {
//     console.error('Failed to fetch file metadata:', error);
//     res.status(500).json({ error: 'Failed to fetch file metadata' });
//   }
// }