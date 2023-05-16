// components/FileMetadataGenerator.tsx
import React, { useEffect } from 'react';

const FileMetadataGenerator: React.FC = () => {
  useEffect(() => {
    const generateMetadata = async () => {
      try {
        await fetch('/api/generate-metadata'); // Trigger the API route
        console.log('nodeContents.json created successfully.');
      } catch (error) {
        console.error('Error generating metadata:', error);
      }
    };

    generateMetadata();
  }, []);

  return null;
};

export default FileMetadataGenerator;