import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

interface Item {
  name: string;
  isFolder: boolean;
}

interface Folder extends Item {
  items: Item[];
}

async function getFolderItems(folderPath: string): Promise<Item[]> {
  const publicDir = path.join(process.cwd(), 'public', folderPath);
  const folderItems = await fs.promises.readdir(publicDir, { withFileTypes: true });

  const items: Item[] = [];
  for (const item of folderItems) {
    const itemName = item.name;
    const isFolder = item.isDirectory();

    if (isFolder) {
      const subfolderItems = await getFolderItems(path.join(folderPath, itemName));
      const folder: Folder = {
        name: itemName,
        isFolder: true,
        items: subfolderItems,
      };
      items.push(folder);
    } else {
      items.push({
        name: itemName,
        isFolder: false,
      });
    }
  }

  return items;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { folderPath } = req.query;
    const items = await getFolderItems(folderPath as string);
    res.status(200).json({ items });
  } catch (error) {
    console.error('Failed to fetch file structure:', error);
    res.status(500).json({ error: 'Failed to fetch file structure' });
  }
}
