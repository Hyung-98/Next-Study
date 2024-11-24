import Link from 'next/link';
import ListActions from './ListActions';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
}

const fetchPost = async (): Promise<BlogPost[]> => {
  const res = await fetch('http://localhost:3000/api/posts');
  return res.json();
};

const List = async () => {
  const post = await fetchPost();

  return (
    <div>
      {/* <ListActions /> */}
      <ul className="flex gap-6">
        {post.map((post: any) => (
          <li key={post.id} className="p-8 border-2 border-gray-200 rounded-xl shadow-md w-1/4">
            <Link href={`/list/detail/${post.slug}`}>
              <h4 className="text-4xl font-bold">{post.title}</h4>
              <p className="mt-5 text-2xl">{new Date(post.date).toLocaleDateString()}</p>
              <ul className="flex gap-4 mt-3">
                {post.tags.map((tag: any) => (
                  <li key={tag.id} className={`px-2 py-1 text-sm ${'bg-' + tag.color}`}>
                    {tag.name}
                  </li>
                ))}
              </ul>
            </Link>
            {/* <ModifyActions id={item._id.toString()} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
