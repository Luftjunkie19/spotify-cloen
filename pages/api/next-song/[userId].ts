import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/util/prismadb';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;
    const { currentSkips } = req.body;

    await prisma.user.update({
        where: {
        id: userId as string,
        }, data: {
        availableSkips: currentSkips - 1,
    }})

 }


export default handler;