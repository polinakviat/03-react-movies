import axios from 'axios';
import type { Movie } from '../types/movie';

const VITE_TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGNhNGZmNjNmNjAzNWE0YTlkYWI3ZmVmZDcxMDY2MCIsIm5iZiI6MTc4OTE1NDA5MS4yNzYsInN1YiI6IjZhYTQ1MzJiYzg1MTUxZDMzNDg4YjlhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2VAS25MrDQQZ9Ft-AXPE3lszgw5iG5uO2N7gerts1ho';

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
    accept: 'application/json',
  },
});

interface PopularMoviesResponse {
  results: Movie[];
}

export const getPopularMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await tmdbApi.get<PopularMoviesResponse>('/search/movie', {
    params: {
      query,
    },
  });
  return data.results;
};


// async function getPopularMovies() {
  // try {
    // const response = await tmdbApi.get('/movie/popular', {
    //   params: {
     //    language: 'uk-UA',
   //      page: 1,
  //     },
 //    });

//    console.log(response.data.results);
 // } catch (error) {
   // console.error('Помилка при запиті до TMDB:', error);
 // }
// }

// getPopularMovies();