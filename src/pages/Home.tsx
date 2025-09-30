import { useEffect, useState, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { useDebouncedValue } from '../hooks/useDebouncedSearch';
import { searchMovies } from '../services/omdb';
import type { OMDBSearchItem } from '../types/omdb';
import Loader from '../components/Loader';

export default function Home() {
  const [q, setQ] = useState('');
  const debounced = useDebouncedValue(q, 350);
  const [results, setResults] = useState<OMDBSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!debounced || debounced.trim().length < 1) {
      setResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
  if (abortControllerRef.current) abortControllerRef.current.abort();
  const ac = new AbortController();
  abortControllerRef.current = ac;

    searchMovies(debounced, ac.signal)
      .then((res) => {
        if (res.Response === 'True') setResults(res.Search || []);
        else setResults([]);
        if (res.Error) {
          setError(res.Error);
        }
      })
      .catch((err) => {
        if (err.name === 'CanceledError' || err.name === 'AbortError') return;
        if (err.response && err.response.status === 429) {
          setError('Rate limit reached. Please retry in a few seconds.');
        } else {
          setError('Network error. Try again.');
        }
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, [debounced]);

  return (
    <main className="p-5 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center mt-5">Find Your Movie Night</h1>
      <SearchBar value={q} onChange={setQ} />
      <div className="mt-10">
        {loading && <Loader />}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
            <p className="text-yellow-800">{error}</p>
            <button onClick={() => setQ((s) => s)} className="underline mt-2 block">Retry</button>
          </div>
        )}
        {!loading && !error && results.length === 0 && debounced && (
          <p className="text-gray-600">No movies found for “{debounced}”.</p>
        )}

        {results.length > 0 && <MovieList movies={results} />}
      </div>
    </main>
  );
}
