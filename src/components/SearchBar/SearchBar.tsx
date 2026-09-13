import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

<div><Toaster /></div>

interface SearchBarProps {
    onSearch: (query: string) => void;
}

toast('No movies found for your request.', {
  icon: '✖️',
});

export default function SearchBar({ onSearch }: SearchBarProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("query") as string;
        const trimmedQuery = query.trim();
        if (trimmedQuery.length > 0) {
            onSearch(trimmedQuery);
        }
        else {
      toast.error('Please enter your search query.');
        }
        const setQuery = (query: string) => {
            const input = e.currentTarget.querySelector<HTMLInputElement>('input[name="query"]');
            if (input) {
                input.value = query;
            }
        };
        setQuery('');
    };

    return (
        <header className={css.header}>
            <div className={css.container}>
                <a
                    className={css.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form className={css.form} onSubmit={handleSubmit}>
                    <input
                        className={css.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button className={css.button} type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>
    );
    }