import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/util/prismadb';

async function handler(req: NextApiRequest, res: NextApiResponse) { 
    const { audioFile, songCover, songName, artistId } = req.body;


    await prisma.song.create({
        data: {
            title: songName,
            musicPath: audioFile,
            songCover: songCover,
           artistId : artistId
        }
    });

    res.status(201).json('Successfully  created a new Song');

};


export default handler;