export interface Movie {
    id: number;
    poster_path: string;
    backdrop_path: string;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
}

export function fetchMovies(query: string): Promise<Movie[]> {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=38ca4ff63f6035a4a9dab7fefd710660`;
    return fetch(url)
        .then((response) => response.json())
        .then((data) => data.results as Movie[]);
}