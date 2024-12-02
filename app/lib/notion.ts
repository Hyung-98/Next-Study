import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

// Notion 클라이언트 초기화
const notion = new Client({ auth: process.env.NOTION_TOKEN });

const ntm = new NotionToMarkdown({
  notionClient: notion
});

// 데이터베이스에서 블로그 목록 가져오기
export const getDatabaseItems = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId
  });

  return response.results;
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId: string) => {
  const response = await notion.blocks.children.list({ block_id: blockId });
  return response.results;
};

export const getPageBySlug = async (slug: string) => {
  const databaseId = process.env.NOTION_DATABASE_ID!;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug
      }
    }
  });
  return response.results[0];
};

// 마크다운으로 변환
export const convertPageToMarkdown = async (pageId: string) => {
  const mdBlocks = await ntm.pageToMarkdown(pageId);
  const markdown = ntm.toMarkdownString(mdBlocks);

  return markdown;
};
