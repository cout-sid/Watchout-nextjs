import React, { useEffect, useState } from 'react';
import{BsFillPlayFill} from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import usePoster from '@/hooks/usePoster';
import { IoAddSharp } from "react-icons/io5";
import axios from 'axios';
import { useCallback } from 'react';
import { FcCheckmark } from "react-icons/fc"
import useFavourites from '@/hooks/useFavourites';
import useCurrentUser from '@/hooks/useCurrentUser';

// import { useRouter } from 'next/router';
// import useInfoModal from '@/hooks/useInfoModal';

interface MovieCardProps{
    data: Record<string,any>;
    onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({data,onClick}) => {
    
    const { path,perror,isLoading} = usePoster(data.id);
    // const movieId = data.id;
    // const [isfav,setIsfav] = useState(false); 
    // const { currentUser, mutate } = useCurrentUser();

    // const toggleFavorites = useCallback(async () => {
        

    //     if (isfav) {
    //         await axios.delete('/api/favourite', { data: { movieId } });
    //     } else {
    //         await axios.post('/api/favourite', { movieId });
    //     }

    //     const { data,mutate: mutateFavourites } = useFavourites();
    //     const updatedFavourites = data;

    //     mutate({ 
    //         ...currentUser, 
    //         favourites: updatedFavourites,
    //     });
    //     mutateFavourites();
    // }, [movieId, isfav, currentUser, mutate]);

    // useEffect(() => {
    //     // e.preventDefault()
    //     const checkFav = async() => {
    //         try {
    //       const response = await axios.get('/api/checkFav', {
    //         params: {
    //             movieId
    //         }
    //       });
        
    //       setIsfav(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // checkFav();
    //   }, [movieId]);

    if (isLoading) return <div>Loading...</div>;
    if (perror) return <div>Error loading poster.</div>;
  
    


  return (
    <div className='group bg-zinc-900 col-span relative h-[12vw]'
        
    >
        <img
        className='
            cursor-pointer
            object-cover
            transition
            duration
            shadow-xl
            rounded-md
            group-hover:opacity-90
            sm:group-hover:opacity-0
            delay-300
            w-full
            h-[12vw]
            '
            src={path} alt="Thumbnail" />
        <div
            className='
                opacity-0
                absolute
                top-0
                transition
                duration-200
                z-10
                invisible
                sm:visible
                delay-300
                w-full
                scale-0
                group-hover:scale-110
                group-hover-translate-y-[6vw]
                group-hover:translate-x-[2vw]
                group-hover:opacity-100
                '
                >
                    <img 
                    className='
                    cursor-pointer
                    object-cover
                    transition
                    duration
                    shadow-xl
                    rounded-t-md
                    w-full
                    h-[12vw]
                    '
                    src={path} alt='Thumbnail'/>
                    <div
                    className='
                    z-10
                    bg-zinc-800
                    p-2
                    lg:p-4
                    absolute
                    w-full
                    transition
                    shadow-md
                    rounded-b-md'
                    >
                        <div className="flex flex-row items-center gap-3">
                            <div
                            className="
                            cursor-pointer
                            w-6
                            h-6
                            lg:w-10
                            lg:h-10
                            bg-white
                            rounded-full
                            flex
                            justify-center
                            items-center
                            transition
                            hover:bg-neutral-300"
                            
                            >
                                <BsFillPlayFill onClick={onClick} size={30} />
                            </div>
                            <div className='flex-col'>
                            <div 
                            
                            className="
                                cursor-pointer 
                                ml-auto 
                                group/item 
                                w-6 h-6 
                                lg:w-10 lg:h-10 
                                border-white 
                                bg-white
                                border-2 
                                rounded-full 
                                flex 
                                justify-center 
                                items-center 
                                transition 
                                hover:bg-neutral-300
                                hover:border-neutral-300
                        ">
                            
                            {/* {isfav?
                            <FcCheckmark size={30} onClick={toggleFavorites}/>: <IoAddSharp size={30} onClick={toggleFavorites}/>} */}
                            
                            <IoAddSharp size={30} />
                            
                        </div>
                                <div className='text-white text-xs' >
                                    {data.genres.join(' | ')}
                                </div>
                            </div>
                        </div>
                        <p className="text-green-400 font-semibold mt-4">
                            <span className='text-white'>{data.title}</span>
                        </p>

                        <div className="flex flex-row mt-4 gap-2 items-center">
                            <p className="text-white text-{10px} lg:text-sm">
                                Duration
                                </p>
                        </div>
                        <div className="flex flex-row mt-4 gap-2 items-center">
                            <p className="text-white text-{10px} lg:text-sm">
                                Genre
                                </p>
                            
                        </div>
                    </div>
                </div>

    </div>
  )
}

export default MovieCard;
