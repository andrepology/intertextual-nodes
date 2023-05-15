import React, { useEffect, useRef } from 'react';

const PdfPage: React.FC = () => {
  const pdfViewerRef = useRef<HTMLObjectElement>(null);
  const searchText = 'recent';

  useEffect(() => {
    const highlightText = () => {
      if ((window as any).find && typeof window.getSelection === 'function') {
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
        data="anotate.pdf"
        type="application/pdf"
        width="100%"
        height="600"
        ref={pdfViewerRef}
      />
    </div>
  );
};

export default PdfPage;