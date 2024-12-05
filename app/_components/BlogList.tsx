'use client';

import { usePostStore } from '../store/usePostStore';
import { useEffect } from 'react';
import Link from 'next/link';

const BlogList = () => {
  const { posts, fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <ul className="flex gap-6">
      {posts.map((post) => (
        <li key={post.id} className="p-6 border-2 border-gray-200 rounded-xl shadow-md w-1/4">
          <Link href={`/list/detail/${post.slug}`}>
            <h4 className="text-2xl font-bold">{post.title}</h4>
            <p className="mt-2 text-lg">{new Date(post.date).toLocaleDateString()}</p>
            <ul className="flex flex-wrap gap-2 mt-2">
              {post.tags.map((tag: any) => (
                <li key={tag.id} className={`px-2 py1 text-sm bg-${tag.color}`}>
                  {tag.name}
                </li>
              ))}
            </ul>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
