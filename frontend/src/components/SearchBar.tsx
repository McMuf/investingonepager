import { useState, type FormEvent } from "react";

interface SearchBarProps {
  onSearch: (symbol: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const symbol = value.trim().toUpperCase();
    if (symbol) onSearch(symbol);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2.5 focus-within:border-violet-500 transition-colors">
        <svg
          className="h-5 w-5 shrink-0 text-neutral-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.6 0 7.5 7.5 0 0010.6 0z" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a ticker symbol (e.g. AAPL, MSFT, TSLA)"
          autoFocus
          className="w-full bg-transparent text-sm text-neutral-100 placeholder:text-neutral-500 outline-none uppercase"
        />
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="shrink-0 rounded-full bg-violet-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-violet-500 disabled:opacity-40 disabled:hover:bg-violet-600"
        >
          {loading ? "Loading…" : "Search"}
        </button>
      </div>
    </form>
  );
}
