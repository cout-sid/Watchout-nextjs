import NextAuth,{ AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prismadb from '@/lib/prismadb';
import { compare } from 'bcryptjs';
require('dotenv').config()


declare module 'next-auth' {
    interface Session {
      user: {
        username: string;
        // add other properties here if needed
      }
    }
  
    interface User {
      username: string;
      // add other properties here if needed
    }
  }
  
  declare module 'next-auth/jwt' {
    interface JWT {
      username: string;
      // add other properties here if needed
    }
  }

export const authOptions:AuthOptions={
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
              username: {
                label: 'username',
                type: 'text',
              },
              password: {
                label: 'password',
                type: 'password'
              }
            },
        async authorize(credentials) {
            if (!credentials?.username || !credentials?.password) {
              throw new Error('username and password required');
            }
    
            const user = await prismadb.user.findUnique({ where: {
              username: credentials.username
            }});
    
            if (!user || !user.hashedPassword) {
              throw new Error('Username does not exist');
            }
    
            const isCorrectPassword = await compare(credentials.password, user.hashedPassword);
    
            if (!isCorrectPassword) {
              throw new Error('Incorrect password');
            }
    
            return user;
          }
        })
    ],
    pages: {
        signIn: '/'
      },
      debug: process.env.NODE_ENV === 'development',
        adapter: PrismaAdapter(prismadb),
        session: { strategy: 'jwt' },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username as string;
      }
      return session;
    },
  },

}

export default NextAuth(authOptions);

