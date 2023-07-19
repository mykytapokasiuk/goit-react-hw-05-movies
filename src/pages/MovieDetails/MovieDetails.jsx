import React, { Suspense, lazy } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import useGetMovieDetails from 'hooks/useGetMovieDetails';
import coming_soon from '../../images/coming_soon.jpg';
import css from './MovieDetails.module.css';

const Cast = lazy(() => import('pages/Cast/Cast'));
const Reviews = lazy(() => import('pages/Reviews/Reviews'));

const MovieDetails = () => {
  const { movieDetails, isLoading, backLink } = useGetMovieDetails();

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
              <p className={css.detailsReleaseDate}>
                <span className={css.details}>Release date</span>
                {movieDetails.release_date}
              </p>
              <ul className={css.detailsGenres}>
                <span className={css.details}>Genres</span>
                {movieDetails.genres.map(item => {
                  return <li key={item.id}>{item.name}</li>;
                })}
              </ul>

              <p className={css.detailsOverview}>
                <span className={css.details}>Overview</span>
                {movieDetails.overview}
              </p>
              <p className={css.detailsBudget}>
                <span className={css.details}>Budget</span>
                {movieDetails.budget}$
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
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Routes>
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
