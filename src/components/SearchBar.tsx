import { useId } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search for movies...',
}: Props) {
  const id = useId();
  return (
    <div className="w-full relative">
      <label htmlFor={`search-${id}`} className="sr-only">
        Search movies
      </label>
      <input
        id={`search-${id}`}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 pl-4 pr-10 rounded-md shadow-sm border focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        aria-label="Search movies by title"
      />
      {value && (
        <button
          aria-label="Clear search"
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
      )}
    </div>
  );
}
