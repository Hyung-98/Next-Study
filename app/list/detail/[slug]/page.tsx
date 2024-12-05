import { getPage, getPageBySlug, convertPageToMarkdown } from '@/app/lib/notion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkToc from 'remark-toc';
import rehypeHighlight from 'rehype-highlight';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import 'highlight.js/styles/darcula.css';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import styles from '@/styles/BlogDetails.module.scss';
import { CustomHeading, CustomLink, CustomImage } from '@/app/_components/MarkdownComponents';

interface BlogPostProps {
  params: { slug: string };
}

const PostPage = async ({ params }: BlogPostProps) => {
  const { slug } = await params;
  console.log(`Slug: ${slug}`);

  const productItem = await getPageBySlug(slug);
  if (!productItem) return <div>Post not found</div>;

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
          <p>{new Date(property.create).toLocaleString()}</p>
        </li>
        <li className={styles.category}>
          <em>Tag</em>
          <ul>
            {property.tags.map((tag: any) => (
              <li key={tag.id} className={`px-1 text-sm bg-${tag.color}`}>
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
        className={styles.markdown}
        remarkPlugins={[remarkGfm, remarkToc, remarkRehype]}
        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings]}
        components={{
          h1: (props: any) => <CustomHeading lv={1} {...props} />,
          h2: (props: any) => <CustomHeading lv={2} {...props} />,
          h3: (props: any) => <CustomHeading lv={3} {...props} />,
          a: (props: any) => <CustomLink {...props} />,
          p: ({ node, ...props }) => {
            const element: any = node?.children[0];
            if (element?.tagName === 'img') {
              return <CustomImage src={element.properties.src} alt={element.properties.alt} />;
            }
            return <p {...props} />;
          },
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                {...rest}
                style={atomDark}
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
