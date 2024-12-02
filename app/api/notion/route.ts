import { NextResponse } from 'next/server';
import { getDatabaseItems } from '../../lib/notion';

export const GET = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID!;
  const posts = await getDatabaseItems(databaseId);
  return NextResponse.json(posts);
};
