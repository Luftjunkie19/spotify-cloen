import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/util/prismadb';

async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const songs = await prisma.song.findMany({
            orderBy: {
                releaseDate: 'desc'
            }
        });
        
        
       return res.status(201).json(songs);
        
    } catch (error) {
        return res.status(400).json(error);
    }

    
}

export default handler;