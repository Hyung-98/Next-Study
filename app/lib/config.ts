export const notionApiSecretKey = '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';
export const rootNotionPageId = '142588c50b95801aac1fdbc9cadd86d7';
export const previewImagesEnabled = true;
export const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
export const port = process.env.PORT || 3000;
export const rootDomain = isDev ? `localhost:${port}` : null;
export const useOfficialNotionAPI =
  false || (process.env.USE_OFFICIAL_NOTION_API === 'true' && process.env.NOTION_TOKEN);
