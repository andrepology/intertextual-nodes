// import { NextApiHandler } from 'next';
// import { createReadStream } from 'fs';
// import FormData from 'form-data';
// import fetch from 'node-fetch';
// import pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// const handler: NextApiHandler = async (req, res) => {
//   if (req.method === 'POST') {
//     const form = new FormData();
//     const pdfStream = createReadStream(req.body.pdf.path);
//     form.append('pdf', pdfStream, { filename: req.body.pdf.name });

//     try {
//         const pdfData = await new Promise<Buffer>((resolve, reject) => {
//             const chunks: Array<Buffer | string> = [];
//             pdfStream.on('data', chunk => chunks.push(chunk));
//             pdfStream.on('end', () => resolve(Buffer.concat(chunks)));
//             pdfStream.on('error', reject);
//           });                  
//       const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
//       const textContents = await Promise.all(
//         Array.from(Array(pdf.numPages).keys()).map(async i => {
//           const page = await pdf.getPage(i + 1);
//           const content = await page.getTextContent();
//           return content.items.map(item => item.str).join('');
//         })
//       );

//       const pineconeData = {
//         text: textContents.join('\n'),
//         filename: req.body.pdf.name,
//       };
//       await fetch('http://127.0.0.1:8000/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(pineconeData),
//       });
//       res.status(200).json({ message: 'PDF uploaded successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// };

// export default handler;