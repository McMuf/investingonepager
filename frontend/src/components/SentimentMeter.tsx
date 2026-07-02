export function SentimentMeter({ score }: { score: number }) {
  // 'sentiment' comparative scores are typically small; clamp to a readable range.
  const clamped = Math.max(-0.5, Math.min(0.5, score));
  const pct = (clamped / 0.5) * 50; // -50..50, relative to center
  const isPositive = clamped >= 0;

  return (
    <div className="w-full">
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-neutral-800">
        <div className="absolute inset-y-0 left-1/2 w-px bg-neutral-600" />
        <div
          className={`absolute inset-y-0 ${isPositive ? "bg-emerald-500" : "bg-rose-500"}`}
          style={
            isPositive
              ? { left: "50%", width: `${pct}%` }
              : { right: "50%", width: `${-pct}%` }
          }
        />
      </div>
      <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wide text-neutral-500">
        <span>Bearish</span>
        <span>Neutral</span>
        <span>Bullish</span>
      </div>
    </div>
  );
}
