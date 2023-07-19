import { useEffect, useState } from 'react';
import { getTrendingMovies } from 'services/api';
import { onError } from 'services/utils';

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
        onError(error.message);
      } finally {
        setIsloading(false);
      }
    };
    fetchMovies();
  }, []);

  return { movies, isLoading };
};

export default useGetTrendingMovies;
