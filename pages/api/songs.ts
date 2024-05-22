import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/util/prismadb';

async function handler(req: NextApiRequest, res: NextApiResponse) {


        const songs = await prisma.song.findMany({
          where:{
            NOT:{
              id:'664d8a593439cb8731e2cd06'
            }
          },
            orderBy: {
                releaseDate: 'desc'
            }
        });
        
        
       return res.status(201).json(songs);
        
 

    
}

export default handler;