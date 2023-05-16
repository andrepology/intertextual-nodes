import React from 'react';
import MetadataList from '@/components/drive/metadataList';
import fs from 'fs';
import path from 'path';

interface FileMetadata {
  extension: string;
  fileName: string;
  author: [string, string, string];
}

const MetadataPage: React.FC<{ metadata: FileMetadata[] }> = ({ metadata }) => {
    return (
    <div>
    <h1 className="text-2xl font-bold mb-4">Metadata List</h1>
    <MetadataList metadata={metadata} />
    </div>
    );
    };
    
    export async function getStaticProps() {
    const publicDir = path.join(process.cwd(), 'public');
    const nodeContentsPath = path.join(publicDir, 'nodeContents.json');
    
    let metadata: FileMetadata[] = [];
    
    if (fs.existsSync(nodeContentsPath)) {
    const fileContents = fs.readFileSync(nodeContentsPath, 'utf-8');
    metadata = JSON.parse(fileContents);
    }
    
    return {
    props: {
    metadata,
    },
    };
    }
    
    export default MetadataPage;