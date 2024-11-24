import Image from 'next/image';
import { notFound } from 'next/navigation';

const fetchPost = async (slug: string) => {
  const response = await fetch(`http://localhost:3000/api/post/${slug}`);
  const data = await response.json();
  return data;
};

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const post = await fetchPost(params.slug);

  if (!post) {
    notFound();
  }

  console.log(post);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{new Date(post.date).toLocaleDateString()}</p>
      <ul>
        {post.tags.map((tag: any) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
      <div>
        {/* {post.blocks.map((block: any) => {
          if (block.type === 'image') {
            const imageUrl =
              block.image.type === 'external' ? block.image.external.url : block.image.file.url;

            return (
              <div key={block.id}>
                <Image src={imageUrl} alt="Blog Detail Image" />
              </div>
            );
          }

          if (block.type === 'paragraph') {
            return <p key={block.id}>{block.paragraph.text[0].plain_text}</p>;
          }

          return null;
        })} */}
      </div>
    </div>
  );
};

export default PostPage;
