import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/api';

const useGetMovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/');

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieDetails = async () => {
      try {
        setIsloading(true);
        const response = await getMovieDetails(movieId);
        setMovieDetails(response);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsloading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  return { movieDetails, isLoading, backLink };
};

export default useGetMovieDetails;
