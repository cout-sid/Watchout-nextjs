import useRecom from "@/hooks/useRecom";
import RecomList from "@/components/RecomList";
import {useRouter} from "next/router";
import usePoster from "@/hooks/usePoster";
import useMovie from "@/hooks/useMovie";
import { useEffect,useState } from "react";

const MoviePage = () => {
    const router = useRouter();
    // const {sentid} =router.query as { id?: string };
    // let id: number | undefined;
    const [id, setId] = useState<number | undefined>(undefined);
    useEffect(() => {
        if (router.isReady) {
          const {id: sentid}  = router.query;
          console.log(typeof sentid);
          if (typeof sentid === 'string') {
            
            const parsedId = parseInt(sentid, 10); // Parse sentid to number if it's a string
            setId(parsedId);
            console.log(`Movie ID: ${id}`);
            // Proceed with your logic here, like fetching data
          } else {
            console.warn('ID is not defined');
            // Handle case where ID is not defined
          }
        }
      }, [router.isReady,router.query.id]);



    const { path,perror,isLoading} = usePoster(id);
    console.log("sending movie id as:",id);
    const {data,error} =useMovie(id);
    data? console.log(data?.title): console.log("title is not defined");
    const {recoms,rerror} =useRecom(data?.title)
    const videoUrl = "https://www.youtube.com/embed/HKSZtp_OGHY";
    const title = data?.title || "default title";

    
    if (isLoading) return <div>Loading...</div>;
    if (perror) return <div>Error loading poster.</div>;
    if (error) return <div className='text-white'>Error loading movie page.</div>;
    if (!data) return <div className='text-white'> Loading...</div>;
    if (rerror) return <div className='text-white'>Error loading RecomIds.</div>;

    return (
        
        <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Video and Image section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                {/* Video */}
                <div className="relative h-96">
                <iframe width="560" height="315" src={videoUrl}
                    title="Movie Trailer"   allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                    gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                </iframe>
                </div>
                {/* Image and Overview */}
                <div className=" flex-col justify-between">
                    <div className="mb-4">
                        <img className="w-full max-w-xs h-auto mx-auto" src={path} alt="Movie Poster" />
                    </div>
                    <div className="text-gray-700">
                        <p className="text-lg font-bold mb-2">Overview:</p>
                        <p className="text-sm">{data.overview}</p>
                    </div>
                </div>
            </div>

            {/* Cast and Director section */}
            <div className="mb-8">
                <p className="text-lg font-bold mb-2">Cast:</p>
                <p>{data.cast.join(' | ')}</p>
                <p className="text-lg font-bold mt-4 mb-2">Director:</p>
                <p>{data.director.join(' | ')}</p>
            </div>

            {/* Similar Movies section */}
            <div className="w-full flex-col justify-between items-center mb-8">
                <p className="text-lg font-bold">Similar Movies:</p>
                <div className="flex space-x-4">
                    <div>
                        <RecomList  idList={recoms} />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default MoviePage;


