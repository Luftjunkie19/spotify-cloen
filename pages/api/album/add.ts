import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/util/prismadb';
async function handler(req:NextApiRequest, res:NextApiResponse){
    const {albumName, creatorId, imageUrl, songs}=req.body;

    if(req.method !== "POST"){
        return res.status(405).json({message:"Method not allowed"});
    }

    if(!albumName || !creatorId || !songs){
        return  res.status(400).json({message : "Missing data in the request body"});
    }

    await prisma.album.create({data:{
        name:albumName,
        songs,
        creatorId,
        imageUrl,
    }});
}

export default handler;