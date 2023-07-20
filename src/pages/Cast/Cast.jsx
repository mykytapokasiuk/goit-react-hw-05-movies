import React from 'react';
import Loader from 'components/Loader/Loader';
import useGetMovieCredits from 'hooks/useGetMovieCredits';
import no_photo from '../../images/no_photo.jpg';
import css from './Cast.module.css';

const Cast = () => {
  const { movieCredits, isLoading } = useGetMovieCredits();

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      <h2 className={css.castTitle}>Cast</h2>
      <ul className={css.castList}>
        {movieCredits.length > 0 &&
          movieCredits.slice(0, 10).map(actor => {
            return (
              <li key={actor.id}>
                <img
                  className={css.castItemImg}
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                      : no_photo
                  }
                  alt={actor.name}
                />
                <div className={css.actorDetails}>
                  <p className={css.actorName}>{actor.name}</p>
                  <p className={css.actorCharacter}>
                    {actor.character ? (
                      <span>
                        Character:{' '}
                        <span className={css.characterColor}>
                          {actor.character}
                        </span>
                      </span>
                    ) : (
                      ''
                    )}
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
