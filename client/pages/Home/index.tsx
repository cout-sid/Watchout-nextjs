import Navbar from "@/components/Navbar"
import { Inter } from "next/font/google";
import MovieList from "@/components/MovieList";
import React  from "react";
import useMovieList from "@/hooks/useMovieList";
import {useEffect} from "react";
import { useRouter } from "next/router";
import {useSession} from 'next-auth/react';
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const session=useSession();
    if(!session) console.log("session not defined yet");
    const router=useRouter();
    useEffect(()=>{
      if(!session){
        console.log("session is not created!")
        router.push('/')
      }
    },[session, router])
    console.log("session:",session);
    console.log("Why is this happening?");
    const { moviedata,allerror,isLoading} = useMovieList();

  
  if (isLoading) return <div className="text-white">Loading...</div>;
  if (allerror) return <div className="text-white">Error loading movies.{allerror.message}</div>;


  return (
    <div>
      
      <div className="pb-40 pt-20">
        
          <MovieList moviedata={moviedata}  />
        
      </div>

      
    </div>
  );
}

