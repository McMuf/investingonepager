import { Router } from "express";
import { getHistorical, getNews, getQuote, getRatios } from "../services/yahoo.js";
import { analyzeNewsSentiment } from "../services/sentiment.js";
import { predictTrend } from "../services/prediction.js";

export const onepagerRouter = Router();

onepagerRouter.get("/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase().trim();

  if (!symbol || !/^[A-Z0-9.\-]{1,10}$/.test(symbol)) {
    return res.status(400).json({ error: "Invalid ticker symbol" });
  }

  try {
    const [quote, ratios, history, news] = await Promise.all([
      getQuote(symbol),
      getRatios(symbol).catch(() => ({})),
      getHistorical(symbol).catch(() => []),
      getNews(symbol).catch(() => []),
    ]);

    const sentiment = analyzeNewsSentiment(news);
    const prediction = predictTrend(history);

    res.json({ symbol, quote, ratios, history, sentiment, prediction });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(404).json({ error: message });
  }
});
