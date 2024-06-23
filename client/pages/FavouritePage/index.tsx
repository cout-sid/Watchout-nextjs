import axios from "axios";
import { useState, useEffect } from "react"; 
import useFavData from "@/hooks/useFavData";
import MovieList from "@/components/MovieList";

export default function FavouritePage(){

    const [favourites,setFavourites] = useState([]);
    const { data,error,isLoading} = useFavData(favourites);



    useEffect(() => {
        const fetchFavourites = async () => {
          try {
            const response = await axios.get('/api/allfavourites');
            setFavourites(response.data);
          } catch (error) {
            console.error('Error fetching favourites:', error);
            
          }
        };
    
        fetchFavourites();
      }, []); 

      

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading Favourite Data.</div>;

    

    return(
  
    <div>
        
    <MovieList moviedata={data}  />

    </div>
    )

}