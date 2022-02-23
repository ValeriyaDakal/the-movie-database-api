import React, { FC } from 'react';
import styles from './MovieItem.module.scss';
import { Link } from 'react-router-dom';
import { toggleToFavorites } from '../../app/reducers/movies.reducer';
import { useDispatch } from 'react-redux';
import { useState } from "react";


interface MovieItemProps {
  title: string;
  img: string;
  id: string;
  voteAverage: number;
  overview: string;
  date: string;
}

const imageUrlBase = process.env.REACT_APP_BASE_IMAGE_URL;

const MovieItem: FC<MovieItemProps> = (props: any) => {
  const {
    title,
    img,
    id,
    voteAverage,
    overview,
    date
  } = props;

  const dispatch = useDispatch();

  const handleAddtoFavourites = () => {
    toggleToFavorites(props)
    dispatch(toggleToFavorites(props));
    handleToggle()
  };

  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div className={styles.wrapper}>
      <Link to={`movies/${id}`}>
        <div className={styles.MovieItem}>
          <img width={300} height={450} src={`${img == null ? "" : imageUrlBase}${img == null ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" : img}`} alt={title} />
          <div className={styles.info}>
            <p>{overview}</p>
          </div>
          <div className={styles.footerInfo}>
            <div className={styles.titleWrapper}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.rating}>&#9733; {voteAverage}</div>
            </div>
            <p className={styles.year}>{new Date(date).getFullYear()}</p>
          </div>
        </div>
      </Link>
      <div className={styles.favorites} onClick={handleAddtoFavourites}>{isActive ? "★" : "☆"}</div>
    </div>
  );
}

export default MovieItem;
