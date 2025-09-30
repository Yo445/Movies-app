import { useId } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

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
    <div className="w-full relative max-w-xl mx-auto">
      <label htmlFor={`search-${id}`} className="sr-only">
        Search movies
      </label>
      <div className="relative">
        {/* Search icon */}
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

        {/* Input */}
        <input
          id={`search-${id}`}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 rounded-full bg-white 
                     border border-gray-200 shadow-sm 
                     focus:outline-none focus:border-none focus:ring-2 focus:ring-indigo-300
                     transition text-gray-800 placeholder-gray-400 
                     text-sm sm:text-base"
          aria-label="Search movies by title"
        />

        {/* Custom Clear button */}
        {value && (
          <button
            aria-label="Clear search"
            onClick={() => onChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 
                       text-gray-400 hover:text-gray-700 transition"
          >
            <FiX size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
