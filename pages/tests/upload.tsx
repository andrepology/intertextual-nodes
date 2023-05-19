import { useState } from 'react';
import pdfjsLib from 'pdfjs-dist';
import MyComponent from '@/components/drive/fileList';

const PdfPage = () => {
  const [pdfText, setPdfText] = useState('');

  const extractPdfText = async () => {
    try {
      const url = 'anotate.pdf';
      const pdf = await pdfjsLib.getDocument(url).promise;
      const numPages = pdf.numPages;
      let text = '';

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        text += content.items.map((item: any) => item.str).join('\n');
      }

      setPdfText(text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <p>MyComponent</p>
      {/* <iframe src="anotate.pdf" />
      <button onClick={extractPdfText}>Extract Text</button>
      {pdfText && <div>{pdfText}</div>} */}
    </>
  );
};

export default PdfPage;