import React, { useState, useEffect } from 'react';
import { FiFile, FiFolder, FiChevronLeft } from 'react-icons/fi';
import { NextPage } from 'next';
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

interface Metadata {
  extension: string;
  fileName: string;
  author: string[];
}

const FileList: NextPage<{ folders: Folder[] }> = ({ folders }) => {
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileMetadata, setFileMetadata] = useState<Metadata | null>(null);

  const handleItemClick = (item: Item) => {
    if (item.isFolder) {
      const folder = folders.find((folder) => folder.name === item.name);
      if (folder) {
        setCurrentFolder(folder);
        setSelectedFile(null); // Reset selected file when entering a folder
      }
    } else {
      setSelectedFile(item.name);
      setFileMetadata(null); // Reset file metadata when selecting a new file
    }
  };

  const handleBackClick = () => {
    setCurrentFolder(null);
    setSelectedFile(null); // Reset selected file when going back
    setFileMetadata(null); // Reset file metadata when going back
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

  const renderFileMetadata = () => {
    if (selectedFile && fileMetadata) {
      return (
        <div className="bg-gray-100 p-4">
          <h3 className="text-lg font-medium mb-2">File Metadata</h3>
          <pre>{JSON.stringify(fileMetadata, null, 2)}</pre>
        </div>
      );
    }
    return null;
  };

  const fetchFileMetadata = async (fileName: string) => {
    try {
      const response = await fetch('/api/file-metadata', {
        method: 'POST',
        body: JSON.stringify({ fileName }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const fileMetadata = await response.json();
        setFileMetadata(fileMetadata);
      } else {
        console.error('Failed to fetch file metadata:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch file metadata:', error);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      fetchFileMetadata(selectedFile);
    }
  }, [selectedFile]);

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
      {renderFileMetadata()}
    </>
  );
};

export async function getServerSideProps() {
  // Fetch file structure and metadata from the API endpoint
  const response = await fetch('/api/file-structure');
  const { folders } = await response.json();

  return {
    props: {
      folders,
    },
  };
}

export default FileList;