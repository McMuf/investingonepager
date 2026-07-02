import type { HistoricalPoint } from "./yahoo.js";

export interface PredictionResult {
  signal: "Bullish" | "Bearish" | "Neutral";
  trendPct30d: number;
  sma20: number | null;
  sma50: number | null;
  projectedPrice: number | null;
  confidence: "Low" | "Medium" | "High";
  disclaimer: string;
}

function simpleMovingAverage(closes: number[], window: number): number | null {
  if (closes.length < window) return null;
  const slice = closes.slice(-window);
  return slice.reduce((a, b) => a + b, 0) / window;
}

// Ordinary least squares slope over the trailing window, expressed as a
// heuristic trend signal. This is not a statistical or ML forecast.
function linearRegressionSlope(closes: number[]): number {
  const n = closes.length;
  if (n < 2) return 0;
  const xMean = (n - 1) / 2;
  const yMean = closes.reduce((a, b) => a + b, 0) / n;

  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (i - xMean) * (closes[i] - yMean);
    den += (i - xMean) ** 2;
  }
  return den === 0 ? 0 : num / den;
}

export function predictTrend(history: HistoricalPoint[]): PredictionResult {
  const closes = history.map((h) => h.close);
  const disclaimer =
    "Heuristic trend indicator based on moving averages and recent price momentum. Not a statistical forecast or investment advice.";

  if (closes.length < 20) {
    return {
      signal: "Neutral",
      trendPct30d: 0,
      sma20: null,
      sma50: null,
      projectedPrice: null,
      confidence: "Low",
      disclaimer,
    };
  }

  const window = Math.min(30, closes.length);
  const recent = closes.slice(-window);
  const slope = linearRegressionSlope(recent);
  const lastClose = closes[closes.length - 1];
  const trendPct30d = (slope * window) / lastClose;

  const sma20 = simpleMovingAverage(closes, 20);
  const sma50 = simpleMovingAverage(closes, 50);

  let signal: PredictionResult["signal"] = "Neutral";
  let bullPoints = 0;
  let bearPoints = 0;

  if (trendPct30d > 0.02) bullPoints++;
  else if (trendPct30d < -0.02) bearPoints++;

  if (sma20 != null && sma50 != null) {
    if (sma20 > sma50) bullPoints++;
    else if (sma20 < sma50) bearPoints++;
  }

  if (sma20 != null) {
    if (lastClose > sma20) bullPoints++;
    else if (lastClose < sma20) bearPoints++;
  }

  if (bullPoints > bearPoints) signal = "Bullish";
  else if (bearPoints > bullPoints) signal = "Bearish";

  const projectedPrice = lastClose * (1 + trendPct30d);
  const confidence: PredictionResult["confidence"] =
    closes.length >= 100 ? "Medium" : "Low";

  return {
    signal,
    trendPct30d,
    sma20,
    sma50,
    projectedPrice,
    confidence,
    disclaimer,
  };
}
