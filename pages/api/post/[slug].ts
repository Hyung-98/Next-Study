import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogPosts, getPageContent } from '@/app/lib/notion';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  if (typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  try {
    const posts = await getBlogPosts();
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const content = await getPageContent(post.id);
    res.status(200).json({ ...post, content });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
