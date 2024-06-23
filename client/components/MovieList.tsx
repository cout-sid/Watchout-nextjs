import MovieCard from "./MovieCard";
import { useRouter } from 'next/router'

interface MovieListProps {
    moviedata: Record<string,any>[];
}

const MovieList:React.FC<MovieListProps> = ({moviedata}) => {

  const router = useRouter()
  
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8"> 
    <div className="grid grid-cols-4 gap-2">
        {moviedata.map((movie)=>(
            <MovieCard key={movie.id} data={movie} onClick={() => router.push(`/MoviePage/${movie.id}`)}/>
      ) )}
    </div>
    </div>
  )
}

export default MovieList;