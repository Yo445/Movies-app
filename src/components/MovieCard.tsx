import type { OMDBSearchItem } from '../types/omdb';
import { Link } from 'react-router-dom';

const PLACEHOLDER = '/placeholder-poster.png';

export default function MovieCard({ movie }: { movie: OMDBSearchItem }) {
  const poster =
    movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER;

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="block group w-full sm:w-56 md:w-60 lg:w-64"
      role="listitem"
    >
      <div
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden 
                   hover:shadow-md hover:-translate-y-1 transition-all duration-200"
      >
        {/* Poster */}
        <div className="relative">
          <img
            src={poster}
            alt={`${movie.Title} poster`}
            loading="lazy"
            className="w-full aspect-[2/3] object-cover group-hover:scale-105 
                       transition-transform duration-300"
          />
        </div>

        {/* Info */}
        <div className="p-3 text-center">
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
            {movie.Title}
          </h3>
          <p className="text-sm text-gray-500">{movie.Year}</p>
        </div>
      </div>
    </Link>
  );
}
