import type { OMDBSearchItem } from '../types/omdb';
import { Link } from 'react-router-dom';

const PLACEHOLDER = '/placeholder-poster.png';

export default function MovieCard({ movie }: { movie: OMDBSearchItem }) {
  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER;
  return (
    <div
      className="bg-white rounded shadow-sm p-3 flex gap-4 items-start hover:shadow-lg transition-shadow duration-150"
      role="listitem"
    >
      <img src={poster} alt={`${movie.Title} poster`} loading="lazy" className="w-24 h-36 object-cover rounded-md flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">{movie.Title}</h3>
        <p className="text-sm text-gray-600">{movie.Year}</p>
        <Link to={`/movie/${movie.imdbID}`} className="text-indigo-600 hover:text-indigo-800 mt-2 inline-block">Details</Link>
      </div>
    </div>
  );
}
