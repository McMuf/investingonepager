import Sentiment from "sentiment";
import type { NewsItem } from "./yahoo.js";

const analyzer = new Sentiment();

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

export function analyzeNewsSentiment(news: NewsItem[]): SentimentSummary {
  const headlines: ScoredHeadline[] = news.map((item) => ({
    ...item,
    score: analyzer.analyze(item.title).comparative,
  }));

  const averageScore =
    headlines.length > 0
      ? headlines.reduce((sum, h) => sum + h.score, 0) / headlines.length
      : 0;

  let label: SentimentSummary["label"] = "Neutral";
  if (averageScore > 0.15) label = "Bullish";
  else if (averageScore < -0.15) label = "Bearish";

  return { label, averageScore, headlines };
}
