import axios from 'axios';
import type { OMDBSearchResponse, OMDBMovie } from '../types/omdb';

const API_KEY = "bccd4879";
const BASE = 'https://www.omdbapi.com/';

if (!API_KEY) {
  console.warn('No OMDB API key set. Set VITE_OMDB_API_KEY in .env or environment variables.');
}

export const searchMovies = async (query: string, signal?: AbortSignal): Promise<OMDBSearchResponse> => {
  const url = `${BASE}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`;
  const res = await axios.get<OMDBSearchResponse>(url, { signal });
  return res.data;
};

export const fetchMovieById = async (id: string, signal?: AbortSignal): Promise<OMDBMovie> => {
  const url = `${BASE}?apikey=${API_KEY}&i=${encodeURIComponent(id)}&plot=full`;
  const res = await axios.get<OMDBMovie>(url, { signal });
  return res.data;
};
