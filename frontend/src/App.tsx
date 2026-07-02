import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { QuoteHeader } from "./components/QuoteHeader";
import { KpiGrid } from "./components/KpiGrid";
import { RatioTable } from "./components/RatioTable";
import { PriceChart } from "./components/PriceChart";
import { SentimentPanel } from "./components/SentimentPanel";
import { PredictionPanel } from "./components/PredictionPanel";
import { fetchOnePager } from "./lib/api";
import type { OnePagerResponse } from "./types";

function App() {
  const [data, setData] = useState<OnePagerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(symbol: string) {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchOnePager(symbol);
      setData(result);
    } catch (err) {
      setData(null);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-[#0d1117]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-violet-600 text-sm font-bold text-white">
              1P
            </div>
            <span className="text-base font-semibold text-neutral-100">
              investingonepager
            </span>
          </div>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {!data && !loading && !error && (
          <div className="flex flex-col items-center gap-2 py-24 text-center text-neutral-500">
            <p className="text-lg">Type a ticker above and hit Enter.</p>
            <p className="text-sm">
              e.g. AAPL, MSFT, TSLA, NVDA — pulled live from Yahoo Finance
            </p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-24 text-neutral-500">
            Loading one-pager…
          </div>
        )}

        {error && (
          <div className="mx-auto max-w-md rounded-lg border border-rose-900 bg-rose-950/40 px-4 py-3 text-sm text-rose-300">
            {error}
          </div>
        )}

        {data && !loading && (
          <div className="flex flex-col gap-8">
            <QuoteHeader quote={data.quote} />
            <PriceChart history={data.history} currency={data.quote.currency} />
            <KpiGrid quote={data.quote} ratios={data.ratios} />
            <RatioTable ratios={data.ratios} />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <SentimentPanel sentiment={data.sentiment} />
              <PredictionPanel prediction={data.prediction} currency={data.quote.currency} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
