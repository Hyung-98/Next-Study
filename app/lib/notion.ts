import { Client } from '@notionhq/client';

// Notion 클라이언트 초기화
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// 데이터베이스에서 블로그 목록 가져오기
export const getBlogPosts = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID!;
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'Date',
        direction: 'descending'
      } // 날짜순으로 정렬
    ]
  });

  return response.results.map((post) => ({
    id: post.id,
    title: post.properties.Title.title[0]?.plain_text || 'Untitled',
    slug: post.properties.Slug.rich_text[0]?.plain_text || '',
    date: post.properties.Date.date.start || '',
    tags: post.properties.Tag.multi_select || []
  }));
};

// 특정 페이지의 블록 콘텐츠 가져오기
export const getPageContent = async (pageId: string) => {
  const blocks = [];
  let cursor;

  while (true) {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor!
    });

    blocks.push(...response.results);

    if (!response.has_more) break;
    cursor = response.next_cursor;
  }

  return blocks;
};
