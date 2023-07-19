import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from 'services/api';
import { onError } from 'services/utils';

const useGetMovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieReviews = async () => {
      try {
        setIsloading(true);
        const response = await getMovieReviews(movieId);
        setMovieReviews(response.results);
      } catch (error) {
        onError(error.message);
      } finally {
        setIsloading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId]);
  return { movieReviews, isLoading };
};

export default useGetMovieReviews;
