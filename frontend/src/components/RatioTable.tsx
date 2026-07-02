import type { Ratios } from "../types";
import { formatCompact, formatNumber, formatPercent } from "../lib/format";

interface RatioRow {
  label: string;
  value: string;
  tone?: "good" | "critical" | "neutral";
}

function toneClass(tone?: RatioRow["tone"]) {
  if (tone === "good") return "text-emerald-400";
  if (tone === "critical") return "text-rose-400";
  return "text-neutral-100";
}

function marginTone(value: number | undefined): RatioRow["tone"] {
  if (value == null) return "neutral";
  if (value >= 0.15) return "good";
  if (value < 0) return "critical";
  return "neutral";
}

export function RatioTable({ ratios }: { ratios: Ratios }) {
  const groups: { title: string; rows: RatioRow[] }[] = [
    {
      title: "Valuation",
      rows: [
        { label: "P/E (trailing)", value: formatNumber(ratios.trailingPE) },
        { label: "P/E (forward)", value: formatNumber(ratios.forwardPE) },
        { label: "Price / book", value: formatNumber(ratios.priceToBook) },
        { label: "Price / sales", value: formatNumber(ratios.priceToSales) },
      ],
    },
    {
      title: "Profitability",
      rows: [
        {
          label: "Gross margin",
          value: formatPercent(ratios.grossMargins),
          tone: marginTone(ratios.grossMargins),
        },
        {
          label: "Operating margin",
          value: formatPercent(ratios.operatingMargins),
          tone: marginTone(ratios.operatingMargins),
        },
        {
          label: "Profit margin",
          value: formatPercent(ratios.profitMargins),
          tone: marginTone(ratios.profitMargins),
        },
        {
          label: "Return on equity",
          value: formatPercent(ratios.returnOnEquity),
          tone: marginTone(ratios.returnOnEquity),
        },
        {
          label: "Return on assets",
          value: formatPercent(ratios.returnOnAssets),
          tone: marginTone(ratios.returnOnAssets),
        },
      ],
    },
    {
      title: "Financial health",
      rows: [
        {
          label: "Debt / equity",
          value: formatNumber(ratios.debtToEquity),
          tone:
            ratios.debtToEquity == null
              ? "neutral"
              : ratios.debtToEquity > 150
                ? "critical"
                : ratios.debtToEquity < 50
                  ? "good"
                  : "neutral",
        },
        {
          label: "Current ratio",
          value: formatNumber(ratios.currentRatio),
          tone:
            ratios.currentRatio == null ? "neutral" : ratios.currentRatio >= 1 ? "good" : "critical",
        },
        {
          label: "Quick ratio",
          value: formatNumber(ratios.quickRatio),
          tone: ratios.quickRatio == null ? "neutral" : ratios.quickRatio >= 1 ? "good" : "critical",
        },
        { label: "Total cash", value: formatCompact(ratios.totalCash) },
        { label: "Total debt", value: formatCompact(ratios.totalDebt) },
        { label: "Free cash flow", value: formatCompact(ratios.freeCashflow) },
      ],
    },
    {
      title: "Growth",
      rows: [
        {
          label: "Revenue growth (YoY)",
          value: formatPercent(ratios.revenueGrowth),
          tone: marginTone(ratios.revenueGrowth),
        },
        {
          label: "Earnings growth (YoY)",
          value: formatPercent(ratios.earningsGrowth),
          tone: marginTone(ratios.earningsGrowth),
        },
      ],
    },
  ];

  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">
        Financial ratios
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {groups.map((group) => (
          <div
            key={group.title}
            className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-4"
          >
            <h3 className="mb-2 text-xs font-medium text-neutral-500">{group.title}</h3>
            <dl className="divide-y divide-neutral-800">
              {group.rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between py-1.5">
                  <dt className="text-sm text-neutral-400">{row.label}</dt>
                  <dd className={`text-sm font-medium tabular-nums ${toneClass(row.tone)}`}>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
