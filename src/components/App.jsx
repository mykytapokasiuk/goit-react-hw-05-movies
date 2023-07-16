import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import HomePage from 'pages/HomePage/HomePage';
import Movies from 'pages/Movies/Movies';
import MovieDetails from 'pages/MovieDetails/MovieDetails';
import css from './App.module.css';

const App = () => {
  return (
    <div>
      <header className={css.header}>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/movies">Movies</NavLink>
        </nav>
      </header>
      <main className={css.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
