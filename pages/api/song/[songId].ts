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

const songObject= await prisma.song.findUnique({where:{id:songId as string}});

if(!songObject){
    return res.status(405).json(null);
}

return res.status(201).json(songObject);

}

export default handler;