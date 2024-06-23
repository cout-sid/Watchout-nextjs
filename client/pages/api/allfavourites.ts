import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).end();    
        }
        
        const { currentUser } = await serverAuth(req, res);
        if (!currentUser) {
            return res.status(401).end(); 
          }
      
          const user = await prismadb.user.findUnique({
            where: { username: currentUser.username},
            select: { favourites: true }
          });
      
          if (!user) {
            return res.status(404).end(); 
          }
      
          return res.status(200).json(user.favourites);


    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
}