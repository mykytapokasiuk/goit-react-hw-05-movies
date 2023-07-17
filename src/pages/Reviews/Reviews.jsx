import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from 'services/api';
import Loader from 'components/Loader/Loader';
import css from './Reviews.module.css';

const Reviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieReviews = async () => {
      try {
        setIsloading(true);
        const response = await getMovieReviews(movieId);
        setMovieReviews(response.results);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsloading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      <h2 className={css.reviewsTitle}>Reviews</h2>
      <ul className={css.reviewList}>
        {movieReviews.length > 0 ? (
          movieReviews.map(review => {
            return (
              <li key={review.id} className={css.reviewListItem}>
                <div className={css.reviewDetails}>
                  <p className={css.reviewAuthor}>
                    <span>Author: </span>
                    {review.author}
                  </p>
                  <p className={css.reviewContent}>{review.content}</p>
                </div>
              </li>
            );
          })
        ) : (
          <p className={css.noReviews}>
            We don`t have any reviews for this movie.
          </p>
        )}
      </ul>
    </div>
  );
};

export default Reviews;
