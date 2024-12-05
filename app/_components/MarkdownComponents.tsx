import React from 'react';
import Image from 'next/image';

interface HeadingProps {
  lv: number;
  children: React.ReactNode;
}

export const CustomHeading = ({ lv, children }: HeadingProps) => {
  const Tag = `h${lv}` as keyof JSX.IntrinsicElements;
  return <Tag>{children}</Tag>;
};

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export const CustomLink = ({ href, children }: LinkProps) => {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      style={{ color: isExternal ? 'lightsalmon' : 'darksalmon' }}
    >
      {children}
    </a>
  );
};

interface ImageProps {
  src: string;
  alt: string;
}

export const CustomImage = ({ src, alt }: ImageProps) => (
  <Image src={src} alt={alt} width={1600} height={600} priority />
);
