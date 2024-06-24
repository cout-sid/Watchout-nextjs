import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

interface RecomResponse {
    recom_movie_ids: number[];
  }

const useRecom = (title: string) => {
    console.log('Fetching recommendations for:', title);
    // const { data, error, isLoading } = useSWR<RecomResponse>(`http://localhost:8000/recommend/?title=${encodeURIComponent(title)}`, fetcher, {
        const { data, error, isLoading } = useSWR<RecomResponse>(`https://watchout-backend.onrender.com/recommend/?title=${encodeURIComponent(title)}`, fetcher, {

        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    console.log("use Recom error:",error);

    return {
        recoms:data?.recom_movie_ids,
        rerror:error,
        isLoading
    };
};

export default useRecom;
