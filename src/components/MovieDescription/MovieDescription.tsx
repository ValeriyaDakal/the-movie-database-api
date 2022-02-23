import React, { FC, useEffect } from 'react';
import styles from './MovieDescription.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDescription } from '../../app/reducers/movies.reducer';

interface MovieDescriptionProps {

}

const MovieDescription: FC<MovieDescriptionProps> = () => {
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const description = useSelector((state: any) => state.movies.currentMovie);
  const imageUrlBase = process.env.REACT_APP_BASE_IMAGE_URL;

  useEffect(() => {
    dispatch(fetchMovieDescription(id));
  }, []);

  return (
    <div className={styles.MovieDescription}>
      <h3 className={styles.title}>{description?.title}</h3>
      <img className={styles.image} src={`${imageUrlBase}${description?.poster_path}`} alt="" />
      <h5 className={styles.tagline}>{description?.tagline}</h5>
      <p className={styles.overview}>{description?.overview}</p>
    </div>
  );
};

export default MovieDescription;
