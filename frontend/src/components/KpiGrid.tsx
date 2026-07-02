import type { QuoteSnapshot, Ratios } from "../types";
import { StatTile } from "./StatTile";
import { formatCompact, formatNumber, formatPercent, formatPrice } from "../lib/format";

interface KpiGridProps {
  quote: QuoteSnapshot;
  ratios: Ratios;
}

export function KpiGrid({ quote, ratios }: KpiGridProps) {
  const currency = quote.currency;

  const dayRange =
    quote.regularMarketDayLow != null && quote.regularMarketDayHigh != null
      ? `${formatPrice(quote.regularMarketDayLow, currency)} – ${formatPrice(quote.regularMarketDayHigh, currency)}`
      : "—";

  const yearRange =
    quote.fiftyTwoWeekLow != null && quote.fiftyTwoWeekHigh != null
      ? `${formatPrice(quote.fiftyTwoWeekLow, currency)} – ${formatPrice(quote.fiftyTwoWeekHigh, currency)}`
      : "—";

  const tiles = [
    { label: "Day range", value: dayRange },
    { label: "52-week range", value: yearRange },
    { label: "Volume", value: formatCompact(quote.regularMarketVolume) },
    { label: "Avg volume (3mo)", value: formatCompact(quote.averageDailyVolume3Month) },
    { label: "P/E (trailing)", value: formatNumber(ratios.trailingPE) },
    { label: "P/E (forward)", value: formatNumber(ratios.forwardPE) },
    { label: "EPS (trailing)", value: formatPrice(ratios.trailingEps, currency) },
    { label: "Dividend yield", value: formatPercent(ratios.dividendYield ? ratios.dividendYield / 100 : undefined) },
    { label: "Beta", value: formatNumber(ratios.beta) },
    {
      label: "Analyst rating",
      value: ratios.recommendationKey ? ratios.recommendationKey.replace(/_/g, " ") : "—",
      sub: ratios.numberOfAnalystOpinions ? `${ratios.numberOfAnalystOpinions} analysts` : undefined,
    },
    { label: "Target price", value: formatPrice(ratios.targetMeanPrice, currency) },
    { label: "Market cap", value: formatCompact(quote.marketCap) },
  ];

  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">
        Key stats
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {tiles.map((tile) => (
          <StatTile key={tile.label} label={tile.label} value={tile.value} sub={tile.sub} />
        ))}
      </div>
    </div>
  );
}
