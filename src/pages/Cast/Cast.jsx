import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from 'services/api';
import Loader from 'components/Loader/Loader';
import css from './Cast.module.css';

const Cast = () => {
  const [movieCredits, setMovieCredits] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieCredits = async () => {
      try {
        setIsloading(true);
        const response = await getMovieCredits(movieId);
        setMovieCredits(response.cast);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsloading(false);
      }
    };

    fetchMovieCredits();
  }, [movieId]);

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      <ul className={css.castList}>
        {movieCredits.length > 0 &&
          movieCredits.slice(0, 10).map(actor => {
            return (
              <li key={actor.id} className={css.castListItem}>
                <img
                  className={css.castItemImg}
                  src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                  alt={actor.name}
                />
                <div className={css.actorDetails}>
                  <p className={css.actorName}>{actor.name}</p>
                  <p className={css.actorCharacter}>
                    Character: {actor.character}
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Cast;
