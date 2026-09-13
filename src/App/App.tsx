// import { useState } from 'react';
//import css from './App.module.css';
// import VoteStats from '../VoteStats/VoteStats';
import SearchBar from '../components/SearchBar/SearchBar.tsx';
import { getPopularMovies } from '../services/tmdbApi.ts';
import { useState } from 'react';
import MovieGrid from '../components/MovieGrid/MovieGrid.tsx';
import type { Movie } from '../types/movie.ts';
import  css from '../components/Loader.module.css'
import { Toaster } from 'react-hot-toast';
import MovieModal from '../components/MovieModal/MovieModal.tsx';

export default function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  const handleSearch = async (query: string) => {
    try {
      setIsError(false);
      setIsEmpty(false);
      setIsLoading(true);
      setMovies([]);

      const data = await getPopularMovies(query);

      if (data.length === 0) {
        setIsEmpty(true);
      } else {
        setMovies(data);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
        <Toaster
        position="top-center"
        reverseOrder={false}
        />
        <SearchBar onSearch={handleSearch} />
      {movies.length > 0 && (
        <MovieGrid items={movies} onSelect={handleSelectMovie} />
      )}
      {isEmpty && <p className={css.text}>No movies found for your request.</p>}
      {isLoading && <p className={css.text}>Loading movies, please wait...</p>}
        {isError && <p className={css.text}>There was an error, please try again...</p>}
        {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      </>
  );
}
