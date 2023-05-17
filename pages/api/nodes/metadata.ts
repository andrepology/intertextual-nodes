// import fs from 'fs';
// import path from 'path';

// export default function handler(req, res) {
//   const { filename } = req.query;

//   const metadataFilePath = path.join(process.cwd(), 'nodeContent.json');

//   try {
//     const fileContent = fs.readFileSync(metadataFilePath, 'utf-8');
//     const metadataList = JSON.parse(fileContent);
//     const metadata = metadataList.find((item) => item.filename === filename);
//     res.status(200).json(metadata);
//   } catch (error) {
//     console.error('Error reading metadata file:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }