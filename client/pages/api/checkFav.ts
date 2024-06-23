import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        if (req.method !== 'POST') {
            return res.status(405).end();
        }
    
        const { currentUser } = await serverAuth(req, res);

        const { movieId } = req.query;

        // Fetch the user from the database
        const user = await prismadb.user.findUnique({
            where: {
                username: currentUser.username,
            },
            select: {
                favourites: true
            }
        });

        // Check if the movieId is in the user's favourites list
        const isFav = user?.favourites.includes(Number(movieId));

        // Return the result
        return res.status(200).json({ isFav });
    } catch (error) {
        console.error(error);
        return res.status(500).end();
    }
    

}