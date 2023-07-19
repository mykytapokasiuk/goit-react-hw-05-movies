import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from 'services/api';

const useGetMovieCredits = () => {
  const [movieCredits, setMovieCredits] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieCredits = async () => {
      try {
        setIsloading(true);
        const response = await getMovieCredits(movieId);
        setMovieCredits(response.cast);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsloading(false);
      }
    };

    fetchMovieCredits();
  }, [movieId]);
  return { movieCredits, isLoading };
};

export default useGetMovieCredits;
