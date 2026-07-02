import type { SentimentSummary } from "../types";
import { SignalBadge } from "./SignalBadge";
import { SentimentMeter } from "./SentimentMeter";
import { formatRelativeTime } from "../lib/format";

function headlineTone(score: number): "good" | "critical" | "neutral" {
  if (score > 0.15) return "good";
  if (score < -0.15) return "critical";
  return "neutral";
}

const toneDot: Record<string, string> = {
  good: "bg-emerald-500",
  critical: "bg-rose-500",
  neutral: "bg-neutral-600",
};

export function SentimentPanel({ sentiment }: { sentiment: SentimentSummary }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
          News sentiment
        </h2>
        <SignalBadge signal={sentiment.label} />
      </div>

      <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-4">
        <SentimentMeter score={sentiment.averageScore} />

        {sentiment.headlines.length === 0 ? (
          <p className="mt-4 text-sm text-neutral-500">No recent headlines found.</p>
        ) : (
          <ul className="mt-4 divide-y divide-neutral-800">
            {sentiment.headlines.map((h) => (
              <li key={h.link} className="flex items-start gap-3 py-2.5">
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${toneDot[headlineTone(h.score)]}`}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <a
                    href={h.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-200 hover:text-violet-400 hover:underline"
                  >
                    {h.title}
                  </a>
                  <div className="mt-0.5 text-xs text-neutral-500">
                    {h.publisher}
                    {h.publisher && h.providerPublishTime ? " · " : ""}
                    {formatRelativeTime(h.providerPublishTime)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
