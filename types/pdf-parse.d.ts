declare module 'pdf-parse' {
    import { Readable } from 'stream';
  
    type PDFParseOptions = {
      max: number;
    };
  
    type PDFParseResult = {
      numpages: number;
      numrender: number;
      info: {
        [key: string]: any;
      };
      metadata: {
        [key: string]: any;
      };
      text: string;
    };
  
    function pdf2json(
      pdfBuffer: Buffer | Readable,
      options?: PDFParseOptions
    ): Promise<PDFParseResult>;
  
    export = pdf2json;
  }
  