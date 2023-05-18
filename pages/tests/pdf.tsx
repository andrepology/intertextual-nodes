import { useEffect, useState } from 'react';

interface PdfContent {
  text: string;
}

const PdfPage: React.FC = () => {
  const [pdfContents, setPdfContents] = useState<PdfContent[]>([]);

  useEffect(() => {
    const fetchPdfContents = async () => {
      try {
        const response = await fetch('/api/nodes/pdf-extraction');
        if (!response.ok) {
          throw new Error('Failed to fetch PDF contents');
        }
        const data = await response.json();
        setPdfContents(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPdfContents();
  }, []);

  return (
    <div>
      <h1>PDF Contents</h1>
      {pdfContents.map((pdfContent, index) => (
        <div key={index}>
          <h2>PDF {index + 1}</h2>
          <p>{pdfContent.text}</p>
        </div>
      ))}
    </div>
  );
};

export default PdfPage;