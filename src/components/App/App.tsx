// import { useState } from 'react';
//import css from './App.module.css';
// import VoteStats from '../VoteStats/VoteStats';
import SearchBar from '../SearchBar/SearchBar.tsx';
import { useState } from 'react';
import MovieGrid from '../MovieGrid/MovieGrid.tsx';
import type { Movie } from '../../types/movie.ts';
import css from '../Loader/Loader.module.css';
import { Toaster } from 'react-hot-toast';
import MovieModal from '../MovieModal/MovieModal.tsx';
import { fetchMovies } from '../../services/movieService.ts';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage.tsx';
import { Loader } from '../Loader/Loader.tsx';

export default function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  const handleSearch = async (query: string) => {
    try {
      setIsError(null);
      setIsEmpty(false);
      setIsLoading(true);
      setMovies([]);

      const data = await fetchMovies({ query });

      if (data.results.length === 0) {
        setIsEmpty(true);
      } else {
        setMovies(data.results);
      }
    } catch (err) {
      setIsError('There was an error, please try again...');
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
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
        {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      </>
  );
}