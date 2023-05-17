import React, { useState } from 'react';
import { FiFile, FiFolder, FiChevronLeft } from 'react-icons/fi';
import { NextPage } from 'next';
import fs from 'fs';
import path from 'path';
import FileMetadataGenerator from '@/components/drive/metadataReader';
import MetadataList from '@/components/drive/metadataList';

interface Item {
  name: string;
  isFolder: boolean;
}

interface Folder extends Item {
  items: Item[];
}

const FileList: NextPage<{ folders: Folder[] }> = ({ folders }) => {
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);

  const handleItemClick = (item: Item) => {
    if (item.isFolder) {
      const folder = folders.find((folder) => folder.name === item.name);
      if (folder) {
        setCurrentFolder(folder);
      }
    }
  };

  const handleBackClick = () => {
    setCurrentFolder(null);
  };

  const renderIcon = (item: Item) => {
    if (item.isFolder) {
      return <FiFolder className="w-6 h-6 text-gray-500" />;
    } else {
      return <FiFile className="w-6 h-6 text-gray-500" />;
    }
  };

  const renderFiles = (folder: Folder | null) => {
    if (folder) {
      return (
        <>
          <li className="px-6 py-4 hover:bg-gray-100 cursor-pointer" onClick={handleBackClick}>
            <div className="flex items-center">
              <div className="flex-shrink-0">{renderIcon(folder)}</div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Back</p>
              </div>
            </div>
          </li>
          {folder.items.map((item, index) => (
            <li key={index} className="px-6 py-4 hover:bg-gray-100 cursor-pointer" onClick={() => handleItemClick(item)}>
              <div className="flex items-center">
                <div className="flex-shrink-0">{renderIcon(item)}</div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                </div>
              </div>
            </li>
          ))}
        </>
      );
    } else {
      const sortedFolders = folders.filter((item) => item.isFolder).concat(folders.filter((item) => !item.isFolder));
      return sortedFolders.map((folder, index) => (
        <li key={index} className="px-6 py-4 hover:bg-gray-100 cursor-pointer" onClick={() => handleItemClick(folder)}>
          <div className="flex items-center">
            <div className="flex-shrink-0">{renderIcon(folder)}</div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{folder.name}</p>
            </div>
          </div>
        </li>
      ));
    }
  };

  return (
    <>
      <div>
        {/* <Header />
        <ChatSide /> */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {renderFiles(currentFolder)}
          </ul>
        </div>
      </div>
      <FileMetadataGenerator />
    </>
  );
};

export async function getServerSideProps() {
  const publicDir = path.join(process.cwd(), 'public');
  const items = fs.readdirSync(publicDir, { withFileTypes: true });

  const folders: Folder[] = [];

  for (const item of items) {
    const itemName = item.name;
    const isFolder = item.isDirectory();

    if (isFolder) {
      const folderPath = path.join(publicDir, itemName);
      const folderItems = fs.readdirSync(folderPath, { withFileTypes: true });

      const folder: Folder = {
        name: itemName,
        isFolder: true,
        items: [],
      };

      for (const folderItem of folderItems) {
        const folderItemName = folderItem.name;
        const isItemFolder = folderItem.isDirectory();

        folder.items.push({
          name: folderItemName,
          isFolder: isItemFolder,
        });
      }

      folders.push(folder);
    } else {
      folders.push({
        name: itemName,
        isFolder: false,
        items: [],
      });
    }
  }

  return {
    props: {
      folders,
    },
  };
}

export default FileList;