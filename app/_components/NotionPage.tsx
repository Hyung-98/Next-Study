'use client';

import Link from 'next/link';
import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';

interface RendererProps {
  recordMap: any;
  rootPageId: string;
}

export const NotionPage = ({ recordMap, rootPageId }: RendererProps) => {
  const Collection = dynamic(
    () => import('react-notion-x/build/third-party/collection').then((m) => m.Collection),
    { ssr: false }
  );

  return (
    <div>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        rootPageId={rootPageId}
        previewImages
        components={{ Collection }}
      />
    </div>
  );
};

export default NotionPage;
