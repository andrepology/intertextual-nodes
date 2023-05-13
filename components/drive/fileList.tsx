import React from 'react';
import { FiFile } from 'react-icons/fi';
import Chatting from '../Chat/Chatting';
import { Header } from '../Chat/Header';
import ChatSide from '../Chat/Chat';

const files = [
  { name: 'Document 1', type: 'pdf' },
  { name: 'Notebook 2', type: 'ipynb' },
  { name: 'Spreadsheet 3', type: 'csv' },
  { name: 'Image 4', type: 'png' },
];

const FileList = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {files.map((file, index) => (
          <li key={index} className="px-6 py-4 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiFile className="w-6 h-6 text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">{file.type.toUpperCase()} File</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function MyComponent() {
  return (
    <div className="flex">
      <div className="w-1/2 h-screen flex flex-col justify-between">
        <Header />
        <FileList />
        <ChatSide />
        {/* <Chatting /> */}
      </div>
      <div className="w-1/2 h-screen">
        <iframe className="w-full h-full" src='anotate.pdf' />
      </div>
    </div>
  );
}
