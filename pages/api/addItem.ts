import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.body;
  const databaseId = process.env.NOTION_DATABASE_ID;

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId as string },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name
              }
            }
          ]
        }
      }
    });

    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
