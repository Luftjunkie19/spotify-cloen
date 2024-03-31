import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/util/prismadb';

async function handler(req: NextApiRequest, res: NextApiResponse) {


        const albums = await prisma.album.findMany({
            orderBy: {
                createdAt:'desc'
            }
        });
        
        
       return res.status(201).json(albums);
        
 

    
}

export default handler;