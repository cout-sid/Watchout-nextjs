import RecomCard from "./RecomCard";
import { useRouter } from "next/router";
import { useState } from "react";

{/* <div className="flex px-4 md:px-10 space-x-5 mt-4"> 
    
    {idList?.map((id)=>(
        <RecomCard key={id} id={id} onClick={() => router.push(`/MoviePage/${id}`)}/>
  ) )}

</div> */}

interface RecomListProps {
    idList: number[] | undefined;
    // onMovieSelect:(id: number) => void;
}

const RecomList:React.FC<RecomListProps> = ({idList}) => {
  const router=useRouter();
  // console.log("idList:", idList);

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 6;

  if(idList===undefined){
    return(
      <div>
        <p>THE IDLIST IS UNDEFINED</p>
      </div>
    )
  }


  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? currentIndex : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex >= idList.length - visibleItems;
    const newIndex = isLastSlide ? currentIndex : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const visibleList = idList.slice(currentIndex, currentIndex + visibleItems);



  return (
    <div className="relative w-full">
      <div className=" flex justify-center gap-2 overflow-visible">
        {visibleList?.map((id) => (
          <RecomCard key={id} id={id} onClick={() => router.push(`/MoviePage/${id}`)} />
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
    
        
        
  )
}

export default RecomList;



