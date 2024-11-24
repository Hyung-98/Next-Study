import type { NextApiRequest, NextApiResponse } from 'next';
import { getBlogPosts } from '@/app/lib/notion';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const posts = await getBlogPosts();
    res.status(200).json(posts);
  } catch (error: any) {
    console.log(getBlogPosts());
    res.status(500).json({ error: error.message });
  }
};

export default handler;
