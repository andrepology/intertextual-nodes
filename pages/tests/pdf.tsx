import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';

const PdfPage = () => {
  const [pdfContents, setPdfContents] = useState<string[]>([]);

  useEffect(() => {
    const fetchPdfContents = async () => {
      try {
        const pdfFiles = await getPdfFiles();

        const contentsPromises = pdfFiles.map(async (pdfFile: string) => {
          const pdfPath = path.join('public', pdfFile);
          const extractedContents = await extractContentsFromPdf(pdfPath);

          return extractedContents;
        });

        const contents = await Promise.all(contentsPromises);
        setPdfContents(contents);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPdfContents();
  }, []);

  const getPdfFiles = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const pdfsDirectory = path.join(process.cwd(), 'public');
      fs.readdir(pdfsDirectory, (err, files) => {
        if (err) {
          reject(err);
        } else {
          const pdfFiles = files.filter((file) => path.extname(file) === '.pdf');
          resolve(pdfFiles);
        }
      });
    });
  };

  const extractContentsFromPdf = (pdfPath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      fs.readFile(pdfPath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  return (
    <div>
      <h1>PDF Contents</h1>
      {pdfContents.map((contents, index) => (
        <div key={index}>
          <h2>PDF {index + 1}</h2>
          <p>{contents}</p>
        </div>
      ))}
    </div>
  );
};

export default PdfPage;