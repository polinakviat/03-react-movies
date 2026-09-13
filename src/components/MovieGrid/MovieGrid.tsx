import type { Movie } from '../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  items: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ items, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {items.map((movie) => (
        <li 
          key={movie.id} 
          className={css.card} 
          onClick={() => onSelect(movie)} // <-- Використовуємо onSelect тут
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Poster'
            }
            alt={movie.title}
            className={css.image}
          />
          <h3 className={css.title}>{movie.title}</h3>
        </li>
      ))}
    </ul>
  );
}