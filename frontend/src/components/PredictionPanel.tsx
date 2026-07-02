import type { PredictionResult } from "../types";
import { SignalBadge } from "./SignalBadge";
import { StatTile } from "./StatTile";
import { formatPrice, formatSignedPercent } from "../lib/format";

export function PredictionPanel({
  prediction,
  currency,
}: {
  prediction: PredictionResult;
  currency?: string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
          Trend indicator
        </h2>
        <SignalBadge signal={prediction.signal} />
      </div>

      <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="30-day trend" value={formatSignedPercent(prediction.trendPct30d)} />
          <StatTile label="SMA 20" value={formatPrice(prediction.sma20 ?? undefined, currency)} />
          <StatTile label="SMA 50" value={formatPrice(prediction.sma50 ?? undefined, currency)} />
          <StatTile
            label="Projected price"
            value={formatPrice(prediction.projectedPrice ?? undefined, currency)}
            sub={`${prediction.confidence} confidence`}
          />
        </div>
        <p className="mt-4 border-t border-neutral-800 pt-3 text-xs leading-relaxed text-neutral-500">
          ⚠ {prediction.disclaimer}
        </p>
      </div>
    </div>
  );
}
