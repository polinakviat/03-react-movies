// import { useState } from 'react';
//import css from './App.module.css';
// import VoteStats from '../VoteStats/VoteStats';
import SearchBar from '../SearchBar/SearchBar.tsx';
import { useState } from 'react';
import MovieGrid from '../MovieGrid/MovieGrid.tsx';
import type { Movie } from '../../types/movie.ts';
import { Toaster, toast } from 'react-hot-toast';
import MovieModal from '../MovieModal/MovieModal.tsx';
import { fetchMovies } from '../../services/movieService.ts';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage.tsx';
import { Loader } from '../Loader/Loader.tsx';

export default function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [Empty, setEmpty] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  const handleSearch = async (query: string) => {
    try {
      setError(null);
      setEmpty(false);
      setLoading(true);
      setMovies([]);

      const data = await fetchMovies({ query });
      

      if (data.results.length === 0) {
        setEmpty(true);
        toast('No movies found for your request.', {
          icon: '✖️',
        });
        return;
      } else {
        setMovies(data.results);
      }
    } catch (err) {
      setError('There was an error, please try again...');
    } finally {
      setLoading(false);
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
        <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
        {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      </>
  );
}