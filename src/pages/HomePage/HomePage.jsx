import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingMovies } from 'services/api';
import Loader from 'components/Loader/Loader';
import css from './HomePage.module.css';

const HomePage = () => {
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

  return (
    <div className={css.container}>
      <h1 className={css.trandingMoviesTitle}>Trending movies</h1>
      {isLoading && <Loader />}
      <ul className={css.movieList}>
        {movies.map(movie => {
          return (
            <li className={css.movieListItem} key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img
                  className={css.poster}
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                />
                <p className={css.movieTitle}>{movie.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomePage;
