import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/util/prismadb';

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        throw Error('Wypierdalaju !');
    }


    const allUsers = await prisma.user.findMany();

    res.status(201).json(allUsers);


 }


export default handler;