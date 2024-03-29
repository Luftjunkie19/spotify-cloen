import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/util/prismadb';
async function handler(req:NextApiRequest, res:NextApiResponse){

    const {songId}=req.body;
    
    const items = await prisma.listenedSong.findMany({orderBy:{
        timeOfListening:'desc',
    }});

    const songIndex=items.findIndex((item)=> item.songId===songId); 

    if (songIndex===-1) {
        return res.status(403).json({message:"No such Song"});
    }

    const selectedSong = await prisma.song.findUnique({where:{id:items[songIndex - 1].songId}});

    return res.status(201).json(selectedSong);
}


export default handler;