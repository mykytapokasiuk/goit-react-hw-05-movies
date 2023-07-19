import React from 'react';
import Loader from 'components/Loader/Loader';
import useGetMovieReviews from 'hooks/useGetMovieReviews';
import css from './Reviews.module.css';

const Reviews = () => {
  const { movieReviews, isLoading } = useGetMovieReviews();

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
