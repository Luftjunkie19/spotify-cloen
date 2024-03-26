import { hash } from 'bcryptjs';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/util/prismadb';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        throw Error('No valid method provided');
    }
try {
    const { user, artist } = req.body;
    
    const existingUser = await prisma.user.findUnique({ where: { email: user.email } });
    
    if (existingUser) {
        throw new Error('User with this credential already exists');
    }

    if (artist) {
        const { firstName, lastName, username, password, email } = artist;  
        
        const encryptedPassword = await hash(password, 12);

        await prisma.user.create({
            data: {
                username: username,
                firstName: firstName,
                password: encryptedPassword,
                lastName: lastName,
                email: email,
                isArtist: true,
            }
        });

    } else {
        
            const { username, password, email } = user;
        
            const hashPassword = await hash(password, 12);
        
         await prisma.user.create({
                data: {
                    username,
                    password: hashPassword,
                    email,
                }
         });
         
    }
 
    

    return res.status(201).json({user, artist});
    
} catch (error) {
    console.log(error);
    return res.status(403).json(error);
}
 }


export default handler;