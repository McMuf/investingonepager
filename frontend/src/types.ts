export interface QuoteSnapshot {
  symbol: string;
  shortName?: string;
  longName?: string;
  currency?: string;
  regularMarketPrice?: number;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
  regularMarketPreviousClose?: number;
  regularMarketOpen?: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  regularMarketVolume?: number;
  averageDailyVolume3Month?: number;
  marketCap?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  exchange?: string;
}

export interface Ratios {
  trailingPE?: number;
  forwardPE?: number;
  priceToBook?: number;
  priceToSales?: number;
  debtToEquity?: number;
  returnOnEquity?: number;
  returnOnAssets?: number;
  profitMargins?: number;
  operatingMargins?: number;
  grossMargins?: number;
  dividendYield?: number;
  beta?: number;
  trailingEps?: number;
  forwardEps?: number;
  revenueGrowth?: number;
  earningsGrowth?: number;
  currentRatio?: number;
  quickRatio?: number;
  totalCash?: number;
  totalDebt?: number;
  freeCashflow?: number;
  targetMeanPrice?: number;
  recommendationKey?: string;
  numberOfAnalystOpinions?: number;
}

export interface HistoricalPoint {
  date: string;
  close: number;
  volume?: number;
}

export interface ScoredHeadline {
  title: string;
  publisher?: string;
  link: string;
  providerPublishTime?: number;
  score: number;
}

export interface SentimentSummary {
  label: "Bullish" | "Bearish" | "Neutral";
  averageScore: number;
  headlines: ScoredHeadline[];
}

export interface PredictionResult {
  signal: "Bullish" | "Bearish" | "Neutral";
  trendPct30d: number;
  sma20: number | null;
  sma50: number | null;
  projectedPrice: number | null;
  confidence: "Low" | "Medium" | "High";
  disclaimer: string;
}

export interface OnePagerResponse {
  symbol: string;
  quote: QuoteSnapshot;
  ratios: Ratios;
  history: HistoricalPoint[];
  sentiment: SentimentSummary;
  prediction: PredictionResult;
}
