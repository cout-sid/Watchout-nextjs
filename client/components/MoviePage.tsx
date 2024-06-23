import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';
import { useEffect } from 'react';
import useRecom from '@/hooks/useRecom';
import RecomList from './RecomList';
import usePoster from '@/hooks/usePoster';

interface MoviePageProps {
    id: number;
    movie: Record<string,any> | undefined;
  }

const MoviePage:React.FC<MoviePageProps> = ({id,movie}) => {

    const router = useRouter();
    const { path,perror,isLoading} = usePoster(id);

    if (isLoading) return <div>Loading...</div>;
    if (perror) return <div>Error loading poster.</div>;

    useEffect(() => {
        if (id === 0) {
            router.push('/');
          }
      }, [id, router]);

      
    // const videoUrl = "https://www.youtube.com/watch?v=HKSZtp_OGHY";
    const videoUrl = "https://www.youtube.com/embed/HKSZtp_OGHY";
    


    const {data,error} =useMovie(id);
    const title = movie?.title || "default title";
    const {recoms,rerror} =useRecom(title)
    if (error) return <div className='text-white'>Error loading movie page.</div>;
    if (!data) return <div className='text-white'> Loading...</div>;
    if (rerror) return <div className='text-white'>Error loading RecomIds.</div>;

    console.log("RECOMS:",recoms);

    return (
        // <div className='text-white'>
        //     {/* <h1>{data.title}</h1>
        //     <p>{data.overview}</p>
        //     <button style={{ backgroundColor: 'skyblue', color: 'white' }} onClick={onBack}>Back to List</button>
        //     <RecomList  idList={recoms} /> */}
        // </div>
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
    );
};

export default MoviePage;