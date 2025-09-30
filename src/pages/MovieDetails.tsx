import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieById } from '../services/omdb';
import type { OMDBMovie } from '../types/omdb';

const PLACEHOLDER = '/placeholder-poster.png';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<OMDBMovie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const ac = new AbortController();
    fetchMovieById(id, ac.signal)
      .then((res) => {
        if (res.Response === 'True') setMovie(res);
        else setError(res.Error || 'Failed to load movie');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError('Network error');
      })
      .finally(() => setLoading(false));
    return () => ac.abort();
  }, [id]);

  if (loading) return <p className="p-4 text-gray-600">Loading...</p>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!movie) return null;

  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER;

  return (
    <article className="p-4 max-w-4xl mx-auto">
      <div className="mt-4 bg-white rounded shadow p-4 flex flex-col sm:flex-row gap-6">
        <img src={poster} alt={`${movie.Title} poster`} loading="lazy" className="w-full sm:w-56 h-auto rounded object-cover" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{movie.Title} <span className="text-gray-500">({movie.Year})</span></h2>
          <p className="mt-2 text-sm"><strong>Genre:</strong> {movie.Genre ?? 'N/A'}</p>
          <p className="text-sm"><strong>Director:</strong> {movie.Director ?? 'N/A'}</p>
          <p className="text-sm"><strong>Actors:</strong> {movie.Actors ?? 'N/A'}</p>
          <p className="mt-3 text-sm"><strong>Plot:</strong> {movie.Plot ?? 'N/A'}</p>
          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="mt-3">
              <strong>Ratings:</strong>
              <ul className="list-disc list-inside mt-1 text-sm">
                {movie.Ratings.map((r) => <li key={r.Source}>{r.Source}: {r.Value}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
