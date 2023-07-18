import React, { useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import { getMovieDetails } from 'services/api';
import Cast from 'pages/Cast/Cast';
import Reviews from 'pages/Reviews/Reviews';
import Loader from 'components/Loader/Loader';
import coming_soon from '../../images/coming_soon.jpg';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
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

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      <Link className={css.goBackBtn} to={backLink.current}>
        Go back
      </Link>
      {movieDetails !== null && (
        <div>
          <h1 className={css.title}>{movieDetails.title}</h1>
          <div className={css.movieContainer}>
            <img
              className={css.poster}
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`
                  : coming_soon
              }
              alt={movieDetails.title}
            />
            <div className={css.detailsContainer}>
              <h2 className={css.detailsTitle}>{movieDetails.title}</h2>
              <p className={css.detailsRating}>
                <span className={css.details}>Rating</span>
                {movieDetails.vote_average}
              </p>
              <p className={css.detailsOverview}>
                <span className={css.details}>Overview</span>
                {movieDetails.overview}
              </p>
              <ul className={css.detailsGenres}>
                <span className={css.details}>Genres</span>
                {movieDetails.genres.map(item => {
                  return <li key={item.id}>{item.name}</li>;
                })}
              </ul>
              <p className={css.detailsBudget}>
                <span className={css.details}>Budget</span>
                {movieDetails.budget} $
              </p>
              <p className={css.detailsReleaseDate}>
                <span className={css.details}>Release date</span>
                {movieDetails.release_date}
              </p>
            </div>
          </div>
          <div className={css.addInfoContainer}>
            <h2 className={css.detailsTitle}>Additional information</h2>
            <div className={css.linkContainer}>
              <NavLink className={css.castBtn} to="cast">
                Cast
              </NavLink>
              <NavLink className={css.reviewsBtn} to="reviews">
                Reviews
              </NavLink>
            </div>
          </div>
          <Routes>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
