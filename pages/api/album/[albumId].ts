import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/util/prismadb'
async function handler(req:NextApiRequest, res:NextApiResponse){
    const {albumId}=req.query;

    const data = await prisma.album.findUnique({where:{id:albumId as string}});

    if(!data){
        return res.status(401).json({msg:"No album found"})
    }

    if(req.method==="GET"){
        return res.status(200).json(data);
    }

    if(req.method === "DELETE"){
        await prisma.album.delete({where:{id:albumId as string}});
        return res.status(200).json('Successfully removed');
    }
}

export default handler;