import type { QuoteSnapshot } from "../types";
import { formatCompact, formatPrice, formatSignedPercent } from "../lib/format";

export function QuoteHeader({ quote }: { quote: QuoteSnapshot }) {
  const change = quote.regularMarketChange ?? 0;
  const isUp = change >= 0;

  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-800 pb-6">
      <div>
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-semibold text-neutral-50">{quote.symbol}</h1>
          <span className="text-sm text-neutral-500">{quote.exchange}</span>
        </div>
        <p className="text-sm text-neutral-400">{quote.longName ?? quote.shortName}</p>
      </div>

      <div className="text-right">
        <div className="text-3xl font-semibold tabular-nums text-neutral-50">
          {formatPrice(quote.regularMarketPrice, quote.currency)}
        </div>
        <div
          className={`text-sm font-medium tabular-nums ${
            isUp ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {isUp ? "▲" : "▼"} {formatPrice(Math.abs(change), quote.currency)} (
          {formatSignedPercent((quote.regularMarketChangePercent ?? 0) / 100)})
        </div>
        <div className="text-xs text-neutral-500">
          Mkt Cap {formatCompact(quote.marketCap)}
        </div>
      </div>
    </div>
  );
}
