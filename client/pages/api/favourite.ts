import { NextApiRequest, NextApiResponse } from 'next';
import { without } from 'lodash';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);
            const { id } = req.body;
            await prismadb.user.update({
                where: {
                    username: currentUser.username,
                },
                data: {
                    favourites: {
                        push: id
                    }
                }
            });

            // const updatedUser = await prismadb.user.findUnique({
            //     where: {
            //         username: currentUser.username || '',
            //     },
            // });
            // Respond with updated favourites
            // return res.status(200).json(updatedUser?.favourites);
    
            // return res.status(200).json({user});
            return res.status(200).end();

        }
  
        if (req.method === 'DELETE') {
            const { currentUser } = await serverAuth(req, res);
    
            const { id } = req.body;
    
            const updatedFavourites = without(currentUser.favourites, id);
    
            await prismadb.user.update({
                where: {
                    username: currentUser.username,
                },
                data: {
                    favourites: updatedFavourites,
                }
            });
    
            // const updatedUser = await prismadb.user.findUnique({
            //     where: {
            //         username: currentUser.username,
            //     },
            // });
            // Respond with updated favourites
            // return res.status(200).json(updatedUser?.favourites);
            return res.status(200).end();
        }
      
        return res.status(405).end();

    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
}