import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/api';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieDetails(movieId);
        setMovieDetails(response);
      } catch (error) {
        console.log(error.message);
      } finally {
        console.log('');
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return <div>{movieDetails !== null && <div>{movieDetails.budget}</div>}</div>;
};

export default MovieDetails;
