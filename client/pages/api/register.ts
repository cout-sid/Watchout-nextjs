import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).end();
        }

    const { username, email, password } = req.body;

    const existingUser = await prismadb.user.findUnique({
        where: {
            username
        }
    })

    if (existingUser) {
        return res.status(422).json({ error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    

    const user = await prismadb.user.create({
        data: {
            username,
            email,
            hashedPassword,
            image: '',
            favourites:[]
        }
    })

    return res.status(200).json(user);
    
    } catch (error) {
        return res.status(400).json({ error: `Something went wrong: ${error}` });
    }
}