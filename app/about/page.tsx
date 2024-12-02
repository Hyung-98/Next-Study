import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
}

const fetchPosts = async (): Promise<BlogPost[]> => {
  const res = await fetch('http://localhost:3000/api/posts');
  return res.json();
};

const NotionPages = async () => {
  const posts = await fetchPosts();

  return (
    <div>
      <h1>Notion 데이터베이스</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            <p>{new Date(post.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotionPages;
