import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";


export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    return {
        props: {}
    }

}

const ProfilePage = () => {
    const { currentUser,error,isLoading} = useCurrentUser();
    if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data</p>;
  if (!currentUser) return <p>No user data available</p>;
  return (
    <div className="text-white">
    <p>Welcome! {currentUser.username}</p>
    <p>Personal Info</p>
    <p>Account</p>

    </div>
  )
}

export default ProfilePage;