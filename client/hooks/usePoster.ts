import useSWR from "swr";
import fetcher from "@/lib/fetcher";

interface PosterResponse {
    path: string;
  }

const usePoster = (id?: number) => {
  

    // const { data, error } = useSWR<PosterResponse>(id?`http://localhost:8000/poster/${id}`:null, fetcher, {
    const { data, error } = useSWR<PosterResponse>(id?`https://watchout-backend.onrender.com/poster/${id}`:null, fetcher, {

        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      });
    
      return {
        path: data?.path !== null ? data?.path : undefined,
        perror:error,
        isLoading: !error && !data,
      };
};
  
export default usePoster;