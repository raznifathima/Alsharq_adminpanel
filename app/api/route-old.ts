import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'Hello from the Next.js API' });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
