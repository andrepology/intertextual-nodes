import { PDFDocument, PDFPage, PDFImage, PDFText } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

const extractPdfContents = async (): Promise<{ text: string; images: string[] }> => {
  const pdfPath = path.join(process.cwd(), 'public', 'anotate.pdf');
  const pdfData = await fs.promises.readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfData);

  const textPages: string[] = [];
  const images: string[] = [];

  const extractTextFromPage = async (page: PDFPage) => {
    const content = await page.getText();
    const text = content.map((item: PDFText) => item.str).join('');
    textPages.push(text);
  };

  const extractImagesFromPage = async (page: PDFPage) => {
    const { width, height } = page.getSize();
    const scale = 2; // Increase scale for better image quality

    const pngImage = await page
      .render()
      .then((data: Uint8Array) => PDFImage.create(data));

    const imageData = await pngImage.scale(scale).convertToBase64Async();
    images.push(`data:image/png;base64,${imageData}`);
  };

  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const page = pdfDoc.getPage(i);
    await extractTextFromPage(page);
    await extractImagesFromPage(page);
  }

  return { text: textPages.join('\n\n'), images };
};

export default extractPdfContents;