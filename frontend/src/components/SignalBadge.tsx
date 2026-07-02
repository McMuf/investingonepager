type Signal = "Bullish" | "Bearish" | "Neutral";

const styles: Record<Signal, string> = {
  Bullish: "bg-emerald-950 text-emerald-400 border-emerald-800",
  Bearish: "bg-rose-950 text-rose-400 border-rose-800",
  Neutral: "bg-neutral-800 text-neutral-300 border-neutral-700",
};

const icons: Record<Signal, string> = {
  Bullish: "▲",
  Bearish: "▼",
  Neutral: "●",
};

export function SignalBadge({ signal }: { signal: Signal }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${styles[signal]}`}
    >
      <span aria-hidden="true">{icons[signal]}</span>
      {signal}
    </span>
  );
}
