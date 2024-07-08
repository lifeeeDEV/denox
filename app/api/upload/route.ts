import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { openDB } from '../../lib/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const db = await openDB();

  if (req.method === 'POST') {
    const { title, description, image, youtube_link, category } = req.body;

    if (!title || !description || !image || !youtube_link || !category) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const result = await db.run(
      'INSERT INTO projects (title, description, image, youtube_link, category) VALUES (?, ?, ?, ?, ?)',
      [title, description, image, youtube_link, category]
    );

    return res.status(201).json({ message: 'Project uploaded successfully.', project: { id: result.lastID, title, description, image, youtube_link, category } });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}