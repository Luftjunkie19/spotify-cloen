import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/util/prismadb';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, uploadPhoto, nickname, updateAds } = req.body;

        if(updateAds){
          await prisma.user.update({where:{id:id}, data:{pastFromLastAds: new Date(), availableSkips:6}});
        return res.status(201).json('Success');
        }
else{

  await prisma.user.update({
   where: {
     id: id,
   },
   data: {
     profileImg: uploadPhoto ? uploadPhoto : undefined,
     username: nickname,
   }
  })
  
  
  return res.status(201).json('Success');
}



    } catch (error) {
      return res.status(403).json(error);
    }

}


export default handler;
