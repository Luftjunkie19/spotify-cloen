import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/util/prismadb';

async function ServerAuth(req:NextApiRequest, res:NextApiResponse) {
    const authSession = await getServerSession(req, res, authOptions);

    if (!authSession?.user?.email) {
        throw new Error('No user logged in');
    }

    const registeredUser = await prisma.user.findUnique({
        where: {
            email: authSession.user.email as string,
        }
    });

    if (!registeredUser) {
             throw new Error('No user logged in');
    }

    return { currentUser:registeredUser };
}

export default ServerAuth