import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/util/prismadb';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') { 
        throw new Error('WYPIERDALAJ !');
    }

    const { artistId } = req.query;


    const foundArtist = await prisma.user.findUnique({
        where: {
            id: artistId as string,
        }
    });


    if (!foundArtist) {
            throw new Error('WYPIERDALAJ !');
    }

    return res.status(200).json(foundArtist);

}

export default handler;