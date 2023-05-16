import React from 'react';

interface FileMetadata {
  extension: string;
  fileName: string;
  author: [string, string, string];
}

interface MetadataListProps {
  metadata: FileMetadata[];
}

const MetadataList: React.FC<MetadataListProps> = ({ metadata }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {metadata.map((file, index) => (
          <li key={index} className="px-6 py-4 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {file.extension ? (
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                    <p className="text-sm text-gray-700">{file.extension.toUpperCase()}</p>
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H14M10 12H4V16H10V12ZM10 12H16V16H10V12ZM14 4V2H10V4H14Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{file.fileName}</p>
                <p className="text-sm text-gray-500">
                  Author: {file.author[0]} ({file.author[1]}), Affiliation: {file.author[2]}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MetadataList;
