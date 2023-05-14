import React, { useEffect, useRef } from 'react';

const PdfPage: React.FC = () => {
  const pdfViewerRef = useRef<HTMLObjectElement>(null);
  const searchText = 'recent years';

  useEffect(() => {
    const highlightText = () => {
      if (typeof window !== 'undefined' && window.find && window.getSelection) {
        const pdfViewer = pdfViewerRef.current;
        const pdfContent = pdfViewer?.ownerDocument;
        const text = pdfContent?.documentElement.innerHTML;
        const highlightedText = `<span style="background-color: yellow">${searchText}</span>`;
        const regex = new RegExp(searchText, 'gi');
        const highlightedContent = text?.replace(regex, highlightedText);

        if (pdfContent) {
          pdfContent.documentElement.innerHTML = highlightedContent || '';
        }
      }
    };

    highlightText();
  }, []);

  return (
    <div>
      <object
        data="/path/to/your/pdf.pdf"
        type="application/pdf"
        width="100%"
        height="600"
        ref={pdfViewerRef}
      />
    </div>
  );
};

export default PdfPage;
