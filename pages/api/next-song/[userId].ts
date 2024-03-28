import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/util/prismadb';
async function handler(req:NextApiRequest, res:NextApiResponse){
if(req.method !== 'GET'){
    throw new Error('GET OUT !');
}

const {userId}=req.query;

const skiperObject= await prisma.user.findUnique({where:{id:userId as string}});

if(!skiperObject){
    throw new Error('No skipper Id has been passed');
}

await prisma.user.update({where:{
    id:userId as string,
}, data:{
    availableSkips: skiperObject.availableSkips - 1,
}});

return res.status(201).json('Successfully moved forward');
}

export default handler;