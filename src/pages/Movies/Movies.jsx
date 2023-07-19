import React from 'react';
import { Link } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import coming_soon from '../../images/coming_soon.jpg';
import css from './Movies.module.css';
import useGetMovies from 'hooks/useGetMovies';

const Movies = () => {
  const { movies, isLoading, location, handleSubmit } = useGetMovies();

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchQuery"
          autoComplete="off"
          placeholder="Search movies..."
          className={css.input}
        />
        <button type="submit" className={css.submitBtn}>
          Search
        </button>
      </form>

      {movies.length > 0 && (
        <ul className={css.movieList}>
          {movies.map(movie => {
            return (
              <li className={css.movieListItem} key={movie.id}>
                <Link state={{ from: location }} to={`/movies/${movie.id}`}>
                  <img
                    className={css.poster}
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
                        : coming_soon
                    }
                    alt={movie.title}
                  />
                  <p className={css.movieTitle}>{movie.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Movies;
