import useSWR from "swr";
import fetcher from "@/lib/fetcher";

interface AllMovieResponse {
    moviedata: Record<string, any>[];
  }

const useMovieList = () => {
    
    const { data, error } = useSWR<AllMovieResponse>(`http://localhost:8080/movie`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      });
    
      return {
        moviedata: data?.moviedata || [],
        allerror:error,
        isLoading: !error && !data,
      };
};
  
export default useMovieList;