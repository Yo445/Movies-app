import type { OMDBSearchItem } from '../types/omdb';
import MovieCard from './MovieCard';

export default function MovieList({ movies }: { movies: OMDBSearchItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4" role="list">
      {movies.map((m) => (
        <MovieCard key={m.imdbID} movie={m} />
      ))}
    </div>
  );
}
