import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Enable pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfPage: React.FC = () => {
  const pdfUrl = 'anotate.pdf'; // Replace with your PDF file path
  const highlightedText = 'a'; // Replace with the text you want to highlight

  const renderTextLayer = (textItems: any[]) => {
    const textLayer = textItems.map(({ str, transform }, index) => {
      if (str.toLowerCase() === highlightedText) {
        return (
          <span
            key={index}
            style={{ backgroundColor: 'yellow' }} // Customize the highlight color here
          >
            {str}{' '}
          </span>
        );
      }

      return `${str} `;
    });

    return textLayer;
  };

  return (
    <div>
      <Document file={pdfUrl} renderMode="svg">
        <Page
          pageNumber={1} // Change the page number as needed
          width={600} // Set the desired width for the page
          // renderTextLayer={renderTextLayer}
        />
      </Document>
    </div>
  );
};

export default PdfPage;