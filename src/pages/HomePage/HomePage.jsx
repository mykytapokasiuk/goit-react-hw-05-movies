import { Link } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import coming_soon from '../../images/coming_soon.jpg';
import css from './HomePage.module.css';
import useGetTrendingMovies from 'hooks/useGetTrendingMovies';

const HomePage = () => {
  const { movies, isLoading } = useGetTrendingMovies();

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
    </div>
  );
};

export default HomePage;
