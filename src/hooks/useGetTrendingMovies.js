import { useEffect, useState } from 'react';
import { getTrendingMovies } from 'services/api';

const useGetTrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsloading(true);
        const response = await getTrendingMovies();
        setMovies(response.results);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsloading(false);
      }
    };
    fetchMovies();
  }, []);

  return { movies, isLoading };
};

export default useGetTrendingMovies;
