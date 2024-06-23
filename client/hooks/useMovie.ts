import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

interface MovieDataResponse {
    moviedata: Record<string, any>;
  }

const useMovie = (id?: number) => {
    const { data, error, isLoading } = useSWR<MovieDataResponse>(id?`http://localhost:8080/movie/${id}`: null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false, 
        revalidateOnReconnect: false
    });

    return {
        data:data?.moviedata,
        error, 
        isLoading,
    }
} 

export default useMovie;