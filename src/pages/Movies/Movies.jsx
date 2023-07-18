import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { getMovies } from 'services/api';
import coming_soon from '../../images/coming_soon.jpg';
import css from './Movies.module.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const searchTerm = searchParams.get('query');
  const location = useLocation();

  useEffect(() => {
    if (!searchTerm) return;
    const fetchMovies = async () => {
      try {
        setIsloading(true);
        const { results } = await getMovies(searchTerm);
        setMovies(results);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsloading(false);
      }
    };
    fetchMovies();
  }, [searchTerm]);

  const handleSubmit = event => {
    event.preventDefault();
    const form_element = event.currentTarget;
    const searchValue = form_element.elements.searchQuery.value.trim();
    setSearchParams({
      query: searchValue,
    });
    // const isSuccess = onSubmit(searchQuery);
    // if (isSuccess) form_element.reset();
  };

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
          required
          minLength={2}
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
