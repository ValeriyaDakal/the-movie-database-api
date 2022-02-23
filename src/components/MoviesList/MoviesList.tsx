import React, { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesList, receiweMoreMovies } from '../../app/reducers/movies.reducer';
import Loader from '../Loader/Loader';
import MovieItem from '../MovieItem/MovieItem';
import styles from './MoviesList.module.scss';

interface MoviesListProps {
}

const MoviesList: FC<MoviesListProps> = () => {
  const dispatch = useDispatch();
  const { results, totalPages } = useSelector((state: any) => state?.movies.popular);
  const { searchResults, searchTotalPages, query } = useSelector((state: any) => state?.movies.search);
  const [page, setPage]: [number, any] = useState(1);
  const [hasMorePages, setHasMorePages]: [boolean, any] = useState(false);
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    if (searchResults) {
      setMoviesList(searchResults);

      return;
    }

    if (searchResults?.length === 0) {
      setMoviesList([]);

      return;
    }

    setMoviesList(results);
  }, [results, searchResults]);

  useEffect(() => {
    dispatch(receiweMoreMovies({query, page}));
    dispatch(fetchMoviesList(page));
  }, [page]);

  useEffect(() => {
    if (searchTotalPages) {
      setHasMorePages(searchTotalPages > page);
      return;
    };

    setHasMorePages (totalPages > page);
  }, [totalPages, searchTotalPages]);

  const receiveMoreFilms = () => {
    setTimeout(() => setPage(page + 1), 1500);
  };

  return (
    <InfiniteScroll next={receiveMoreFilms}
      hasMore={hasMorePages}
      className={styles.MoviesList}
      loader={<Loader />}
      dataLength={moviesList.length}>

      {moviesList?.length ? moviesList.map((film: any, index: number) => (
        <MovieItem key={index}
          img={film.poster_path}
          id={film.id}
          voteAverage={film.vote_average}
          overview={film.overview}
          date={film.release_date}
          title={film.title} />
      )) : <h3>It is not found on your search of movies</h3>}
    </InfiniteScroll>
  );
};

export default MoviesList;
