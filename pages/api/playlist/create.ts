import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/util/prismadb';
async function handler(req:NextApiRequest, res:NextApiResponse){
    const {playlistName, creatorId, imageUrl, songs}=req.body;

    if(req.method !== "POST"){
        return res.status(405).json({message:"Method not allowed"});
    }

    if(!playlistName || !creatorId || !songs){
        return  res.status(400).json({message : "Missing data in the request body"});
    }

    await prisma.playList.create({data:{
        name:playlistName,
        songs,
        creatorId,
        imageUrl,
    }});
}

export default handler;