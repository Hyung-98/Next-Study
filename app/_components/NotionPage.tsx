'use client';

import React from 'react';
import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';

// Third-party components (optional)
const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m) => m.Code));
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then((m) => m.Collection)
);
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
);
const Pdf = dynamic(() => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf), {
  ssr: false
});
const Modal = dynamic(() => import('react-notion-x/build/third-party/modal').then((m) => m.Modal), {
  ssr: false
});

interface NotionPageProps {
  recordMap: any;
}

export const NotionPage = ({ recordMap }: NotionPageProps) => {
  return (
    <div>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        // rootPageId={rootPageId}
        components={{ Code, Collection, Pdf, Equation, Modal }}
      />
    </div>
  );
};

export default NotionPage;
