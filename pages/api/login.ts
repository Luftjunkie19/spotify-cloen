import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/util/prismadb'
import { compare } from "bcryptjs";
async function handler(req:NextApiRequest, res:NextApiResponse){

    if(req.method !== 'POST'){
    throw new Error('Impossible action 😂');
    }

    const {email, password}=req.body;

    const existingUser= await prisma.user.findUnique({where:{email:email}});

if(!existingUser){
    return res.status(401).json({user:null, message:'No accessible user with this email'});
}

    const isEqualPassword= compare(password, existingUser.password as string);

    if(!isEqualPassword){
        return res.status(401).json({message:'Invalid password provided !', user:null});
    }

    return res.status(201).json({message:null, user:existingUser});

}

export default handler;