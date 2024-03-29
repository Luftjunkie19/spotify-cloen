import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/util/prismadb'
async function handler(req:NextApiRequest, res:NextApiResponse){

    const {userId, songId}=req.body;

    const existingUser= await prisma.user.findUnique({where:{id:userId}});

    if(!existingUser){
        throw new Error('No user accessible');
    }

    const listenedSong= await prisma.listenedSong.create({data:{
        listenerId:userId as string,
        songId: songId as string,
    }});

    return res.status(201).json(listenedSong);


}

export default handler;