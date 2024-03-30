import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/util/prismadb';
async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).json({message:"Method not allowed"});
    }

    const {userId}=req.query;

if(!userId){
    return res.status(405).json({message:'Song Id'});
}

const userObject= await prisma.user.findUnique({where:{id:userId as string}});

if(!userObject){
    return res.status(405).json(null);
}

return res.status(201).json(userObject);

}

export default handler;