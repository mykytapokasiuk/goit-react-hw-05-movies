import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingMovies } from 'services/api';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getTrendingMovies();
        setMovies(response.results);
      } catch (error) {
        console.log(error.message);
      } finally {
        console.log('zxczxc');
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className={css.container}>
      {movies.map(movie => {
        return (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            {movie.title} {movie.popularity}
          </Link>
        );
      })}
    </div>
  );
};

export default HomePage;
