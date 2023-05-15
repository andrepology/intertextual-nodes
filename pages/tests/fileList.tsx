import { NextPage } from 'next';
import fs from 'fs';
import path from 'path';

const PublicPage: NextPage<{ files: string[] }> = ({ files }) => {
  return (
    <div>
      <h1>Public Directory</h1>
      {files.map((file) => (
        <p key={file}>{file}</p>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const publicDir = path.join(process.cwd(), 'public');
  const files = fs.readdirSync(publicDir);

  return {
    props: {
      files,
    },
  };
}

export default PublicPage;
