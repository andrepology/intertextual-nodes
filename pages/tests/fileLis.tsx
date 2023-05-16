import React from 'react';
import { FiFile } from 'react-icons/fi';
import { NextPage } from 'next';
import fs from 'fs';
import path from 'path';

interface File {
  name: string;
  type: string;
}

const FileList: NextPage<{ files: File[] }> = ({ files }) => {
  return (
    <div>
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
    </div>
  );
};

export async function getServerSideProps() {
  const publicDir = path.join(process.cwd(), 'public');
  const fileNames = fs.readdirSync(publicDir);
  const files: File[] = fileNames.map((fileName) => {
    const extension = path.extname(fileName).replace('.', '');
    return {
      name: path.basename(fileName),
      type: extension,
    };
  });

  return {
    props: {
      files,
    },
  };
}

export default FileList;
