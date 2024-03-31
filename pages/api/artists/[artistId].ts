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

    const artistObject= await prisma.user.findUnique({where:{id:artistId as string}});


    const songs= await prisma.song.findMany({where:{artistId:artistId as string}})

    const listenedSongs= songs.map(async(item:any)=>{
        let listenedToSongs=[];

        const foundListened= await prisma.listenedSong.count({where:{songId:item.id as string}});
        
        listenedToSongs.push(foundListened);

        return listenedToSongs.filter((item)=>item !== undefined || item !== null);
    });

    if (!songs) {
            throw new Error('WYPIERDALAJ !');
    }

    return res.status(200).json({songs, listenedSongs, artist:artistObject});

}

export default handler;