import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useFavData = (ids?: number[]) => {
  // Serialize the list of IDs into a query string
  const queryString = ids ? `?idlist=${ids.join(',')}` : '';
  
  const { data, error, isLoading } = useSWR(ids ? `http://localhost:8080/favourites${queryString}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
  }
}

export default useFavData;