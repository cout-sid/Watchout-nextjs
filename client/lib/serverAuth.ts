import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prismadb from '@/lib/prismadb';
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.username) {
    throw new Error('no session for serverAuth');
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      username: session.user.username,
    }
  });
  
  if (!currentUser) {
    throw new Error('user not found, ServerAuth');
  }

  return { currentUser };
}

export default serverAuth;