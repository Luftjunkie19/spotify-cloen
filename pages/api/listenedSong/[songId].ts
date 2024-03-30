import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/util/prismadb';
async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).json({message:"Method not allowed"});
    }

    const {songId}=req.query;

if(!songId){
    return res.status(405).json({message:'Song Id'});
}

const songsItems= await prisma.listenedSong.count({where:{songId:songId as string}});

if(!songsItems){
    return res.status(405).json(null);
}

return res.status(201).json(songsItems);

}

export default handler;