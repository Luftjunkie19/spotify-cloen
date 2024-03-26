import { compare } from 'bcryptjs';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from '@/util/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const existingUser = await prisma.user.findUnique({
          where: {
          email: credentials.email
          }
        });
        
         if (!existingUser || !existingUser?.password) {
          throw new Error('Invalid credentials');
        }
      
        const isPasswordEqual = await compare(credentials.password, existingUser.password as string);

        if (!isPasswordEqual) { 
          throw new Error('Incorrect password');
        }

        return existingUser;

      }
    })
  ],
  debug: process.env.NODE_ENV === 'production',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
