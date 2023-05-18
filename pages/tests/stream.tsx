import { useState } from 'react';
import axios from 'axios';
import { PDFDocumentProxy } from 'pdfjs-dist';

const pdfjsLib = require('pdfjs-dist');

const PdfPage = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!pdfFile) {
      console.error('No PDF file selected');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }) as PDFDocumentProxy;
        const pagePromises = [];

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);
          const textContent = await page.getTextContent();
          const textItems = textContent.items.map((item: any) => item.str);
          const pageText = textItems.join(' ');
          pagePromises.push(pageText);
        }

        const text = pagePromises.join(' ');

        // Send request to ChatGPT
        const response = await axios.post('/api/chat/gpt', {
          text,
          question,
        });

        setResponse(response.data.response);
      };

      reader.readAsArrayBuffer(pdfFile);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Ask your PDF 💬</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="pdfFile">Upload your PDF:</label>
        <input type="file" id="pdfFile" accept=".pdf" onChange={handleFileUpload} />
        <br />
        <label htmlFor="question">Ask a question about your PDF:</label>
        <input type="text" id="question" value={question} onChange={handleQuestionChange} />
        <br />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default PdfPage;