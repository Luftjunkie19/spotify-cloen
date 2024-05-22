import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/util/prismadb';

async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method !== 'GET'){
        return res.json('Inappropriate action');
    }

    const advertisementObj= await prisma.song.findUnique({where:{
        id:"664d8a593439cb8731e2cd06"
    }});

    if(!advertisementObj){
        return res.json('No advertisement found');
    }

    return res.status(201).json(advertisementObj);

}

export default handler;