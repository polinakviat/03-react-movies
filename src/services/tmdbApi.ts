import axios from 'axios';

const VITE_TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGNhNGZmNjNmNjAzNWE0YTlkYWI3ZmVmZDcxMDY2MCIsIm5iZiI6MTc4OTE1NDA5MS4yNzYsInN1YiI6IjZhYTQ1MzJiYzg1MTUxZDMzNDg4YjlhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2VAS25MrDQQZ9Ft-AXPE3lszgw5iG5uO2N7gerts1ho';

export const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
    accept: 'application/json',
  },
});