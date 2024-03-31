import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/util/prismadb'

async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).json('Method not allowed');
    }

    const playlists= await prisma.playList.findMany();

    if(!playlists){
        return res.status(405).json('No playlists');
    }

    return res.status(201).json(playlists);
}


export default handler;