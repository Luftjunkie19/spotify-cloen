import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/util/prismadb';
async function handler(req:NextApiRequest, res:NextApiResponse){

    const {followerId}=req.query;
    const {artistId}=req.body;

    const followerObject= await prisma.user.findUnique({where:{id:followerId as string}});

    const followedObject = await prisma.user.findUnique({where:{id:artistId}});
    if(!followerObject || !followedObject){
        return res.status(401).json({msg:'Follower not found'});
    }

    if(req.method === 'POST'){
        
        
            if(followerObject.followed.includes(artistId)) {
                await prisma.user.update({where:{id:followerId as string}, data:{
                    followed: [...followerObject.followed].filter(e=> e !== artistId)
                }});
        
                await prisma.user.update({where:{id: followedObject.id}, data:{
                    followers: [...followedObject.followers].filter(e => e != followerId )
                }})
            
            return res.status(200).json({msg:`Unfollowed ${followedObject.username}`});
            }
            
            await prisma.user.update({
                where:{id:followerId as string}, data:{
                    followed: [...followerObject.followed, artistId]
                }
            });
            await prisma.user.update({where:{id:followerId as string},data:{
                followers:[...followedObject.followers, followerId] as string[]
            } });
        
            return res.status(201).json(followedObject);
    }

    if(req.method==='GET'){
        return res.status(200).json({followers:followerObject.followers, followed:followerObject.followed
        });
    }



}

export default handler;