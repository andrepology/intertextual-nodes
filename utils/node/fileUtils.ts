import fs from 'fs';
import path from 'path';

export const readMetadataFile = async () => {
  try {
    const filePath = path.join(process.cwd(), 'nodeContent.json');
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading metadata file:', error);
    return null;
  }
};