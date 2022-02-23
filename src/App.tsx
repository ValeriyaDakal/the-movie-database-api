import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import MoviesList from './components/MoviesList/MoviesList';
import Favorites from './components/Favorites/Favorites';
import MovieDescription from './components/MovieDescription/MovieDescription';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movies/:id" element={<MovieDescription />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
