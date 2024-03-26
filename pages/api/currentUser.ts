import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import ServerAuth from '@/util/serverAuth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json('No currentUser');
    }
    
    try {
        const {currentUser} = await ServerAuth(req, res);
        
        if (!currentUser) {
            throw new Error('No current user');
        }

        return res.status(201).json(currentUser);

    } catch (error) {
         return res.status(405).json(error);
    }
}

export default handler;