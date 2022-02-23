import React, { FC, useEffect } from 'react';
import styles from './Favorites.module.scss';
import { useSelector } from 'react-redux';
import MovieItem from '../MovieItem/MovieItem';

interface FavoritesProps { }

const Favorites: FC<FavoritesProps> = () => {
  const favorites = useSelector((state: any) => state?.movies.favorites);
  
  useEffect(() => {}, [])
  return (
    <div className={styles.Favorites}>
      {favorites.length ? favorites.map((movie: any) => {
        return (
          <MovieItem {...movie} />
        );
      }) : <h3>You have no any items</h3>
      }
    </div>
  )
};


export default Favorites;
