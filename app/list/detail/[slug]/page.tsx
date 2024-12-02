import { getPage, getPageBySlug, convertPageToMarkdown } from '@/app/lib/notion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkToc from 'remark-toc';
import rehypeHighlight from 'rehype-highlight';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import 'highlight.js/styles/base16/dracula.min.css';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import styles from '@/styles/BlogDetails.module.scss';
import Heading from '@/app/_components/Heading';

interface BlogPostProps {
  params: { slug: string; id: string };
}

const PostPage = async ({ params }: BlogPostProps) => {
  const { slug } = await params;

  console.log(`Slug: ${params}`);
  const productItem = await getPageBySlug(slug);

  const page = await getPage(productItem.id);
  const property = {
    title: page.properties.Title.title[0].plain_text || '',
    create: page.properties.Create.created_time || '',
    tags: page.properties.Tag.multi_select || [],
    date: page.properties.Date.date.start || '',
    description: page.properties.Description.rich_text[0].text.content || ''
  };
  const markdown = await convertPageToMarkdown(productItem.id);

  return (
    <div className={styles.detail}>
      <h1 className={styles.title}>{property.title}</h1>
      <ul className={styles.category_wrap}>
        <li className={styles.category}>
          <em>Create</em>
          <p className={styles.create}>{new Date(property.create).toLocaleString()}</p>
        </li>
        <li className={styles.category}>
          <em>Tag</em>
          <ul>
            {property.tags.map((tag: any) => (
              <li key={tag.id} className={`px-1 text-sm ${'bg-' + tag.color}`}>
                {tag.name}
              </li>
            ))}
          </ul>
        </li>
        <li className={styles.category}>
          <em>Date</em>
          <p>{new Date(property.date).toLocaleString()}</p>
        </li>
        <li className={styles.category}>
          <em>Description</em>
          <p>{property.description}</p>
        </li>
      </ul>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkToc, remarkRehype]}
        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          }
        }}
      >
        {markdown.parent}
      </ReactMarkdown>
    </div>
  );
};

export default PostPage;
