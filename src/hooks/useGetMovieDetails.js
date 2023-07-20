import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/api';
import { onError } from 'services/utils';

const useGetMovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  console.log(location);
  const backLink = useRef(location.state?.from ?? '/');
  console.log(backLink);

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieDetails = async () => {
      try {
        setIsloading(true);
        const response = await getMovieDetails(movieId);
        setMovieDetails(response);
      } catch (error) {
        onError(error.message);
      } finally {
        setIsloading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  return { movieDetails, isLoading, backLink };
};

export default useGetMovieDetails;
