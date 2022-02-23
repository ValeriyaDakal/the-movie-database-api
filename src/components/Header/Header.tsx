import React, { FC, useRef } from 'react';
import styles from './Header.module.scss';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchMovies } from '../../app/reducers/movies.reducer';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
  const inputRef: any = useRef(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(searchMovies(inputRef?.current?.value));
  }

  return (
    <div className={styles.Header}>
      <Navbar bg="dark" variant="dark">
        <Link className={styles.link} to={'/'}>Home</Link>
        <Link className={styles.link} to={'/favorites'}>Favorites</Link>
        <input ref={inputRef} type="text" />
        <button onClick={handleClick} className={styles.button}>Search</button>
      </Navbar>
    </div>
  )
};

export default Header;
