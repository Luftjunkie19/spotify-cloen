import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/util/prismadb';
async function handler (req:NextApiRequest, res:NextApiResponse){

    if(req.method !== 'POST'){
     throw new Error('Error , wrong method used.');
    }

    const {songId, likerId}=req.body;

    const existingUser = await prisma.user.findUnique({where:{id:likerId}});

    if(!existingUser){
        throw new Error('No user');
    }else{
        if(!existingUser.favouriteSongs.find((item:any)=>item === songId)){
            await prisma.user.update({where:{id:likerId}, data:{
                favouriteSongs: [...existingUser.favouriteSongs, songId] as unknown as string[],
            }});
            return res.status(201).json({favouriteSongs: [...existingUser.favouriteSongs, songId]});
        }else{

            await prisma.user.update({where:{id:likerId}, data:{
                favouriteSongs: [...existingUser.favouriteSongs.filter((item:any)=>item !== songId)]}});
            return res.status(201).json({favouriteSongs: [...existingUser.favouriteSongs.filter((item:any)=>item !== songId)]});
        }
    }

}

export default handler;