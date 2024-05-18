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

    if(selectedSong){
        return res.status(201).json(selectedSong);
    }else{
        return res.status(201).json(null);
    }
}


export default handler;