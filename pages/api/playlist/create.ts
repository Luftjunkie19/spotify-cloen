import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/util/prismadb';

async function handler(req:NextApiRequest, res:NextApiResponse){
    const {playlistName, creatorId, imageUrl, songs}=req.body;

    if(req.method !== "POST"){
        return res.status(405).json({message:"Method not allowed"});
    }

    if(!playlistName || !creatorId || !songs){
        return  res.status(400).json({message : "Missing data in the request body"});
    }

const playlistSongs= songs.map((item:any) =>item.id);

     await prisma.playList.create({
        data: {
            name: playlistName,
            creatorId,
            imageUrl,
            songs:playlistSongs,
        }
    });


    return res.status(201).json("Success");
}

export default handler;