import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { HistoricalPoint } from "../types";
import { formatPrice } from "../lib/format";

interface PriceChartProps {
  history: HistoricalPoint[];
  currency?: string;
}

interface TooltipPayloadEntry {
  value: number;
  payload: HistoricalPoint;
}

function ChartTooltip({
  active,
  payload,
  currency,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  currency?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs shadow-lg">
      <div className="text-neutral-400">{point.date}</div>
      <div className="font-semibold tabular-nums text-neutral-100">
        {formatPrice(point.close, currency)}
      </div>
    </div>
  );
}

export function PriceChart({ history, currency }: PriceChartProps) {
  if (history.length < 2) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-neutral-500">
        Not enough price history to chart.
      </div>
    );
  }

  const first = history[0].close;
  const last = history[history.length - 1].close;
  const isUp = last >= first;
  const color = isUp ? "#34d399" : "#fb7185";

  const tickIndices = new Set([
    0,
    Math.floor(history.length / 4),
    Math.floor(history.length / 2),
    Math.floor((3 * history.length) / 4),
    history.length - 1,
  ]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
          Price — last 12 months
        </h2>
        <span className={`text-xs font-medium ${isUp ? "text-emerald-400" : "text-rose-400"}`}>
          {isUp ? "▲" : "▼"} {(((last - first) / first) * 100).toFixed(1)}% over period
        </span>
      </div>
      <div className="h-64 w-full rounded-lg border border-neutral-800 bg-neutral-900/60 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#27272a"
              strokeWidth={1}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "#71717a", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "#3f3f46" }}
              ticks={history.filter((_, i) => tickIndices.has(i)).map((h) => h.date)}
            />
            <YAxis
              domain={["auto", "auto"]}
              tick={{ fill: "#71717a", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={56}
              tickFormatter={(v: number) => formatPrice(v, currency)}
            />
            <Tooltip content={<ChartTooltip currency={currency} />} />
            <Area
              type="monotone"
              dataKey="close"
              stroke={color}
              strokeWidth={2}
              fill="url(#priceFill)"
              activeDot={{ r: 4, fill: color, stroke: "#0d1117", strokeWidth: 2 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
