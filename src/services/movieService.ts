import type { Movie } from '../types/movie.ts';
import { tmdbApi } from './tmdbApi.ts';

export interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface FetchMoviesParams {
  query?: string;
  page?: number;
}

export const fetchMovies = async (
  params: FetchMoviesParams = {}
): Promise<FetchMoviesResponse> => {
  const response = await tmdbApi.get<FetchMoviesResponse>('/search/movie', {
    params,
  });

  return response.data;
};