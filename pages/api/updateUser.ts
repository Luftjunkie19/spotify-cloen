import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/util/prismadb';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, uploadPhoto, nickname } = req.body;

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

    } catch (error) {
      return res.status(403).json(error);
    }

}


export default handler;
