import { create } from 'zustand';

interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  tags: [];
  content: string;
}

interface PostState {
  posts: Post[];
  fetchPosts: () => Promise<void>;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  fetchPosts: async () => {
    try {
      const response = await fetch('/api/notion');
      const data = await response.json();
      set({
        posts: data.map((post: any) => ({
          id: post.id,
          title: post.properties.Title.title[0].plain_text || '',
          slug: post.properties.Slug.rich_text[0].plain_text || '',
          date: post.properties.Date.date.start || '',
          tags: post.properties.Tag.multi_select || [],
          content: ''
        }))
      });
    } catch (error) {
      console.error('failed to fetch posts: ', error);
    }
  }
}));
