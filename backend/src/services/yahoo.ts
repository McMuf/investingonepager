import YahooFinance from "yahoo-finance2";

// yahoo-finance2's `this`-bound overloads don't resolve cleanly under strict
// TS + NodeNext, so we cast SDK responses to `any` and map them into the
// narrow interfaces below rather than fighting the library's declared types.
const yf = new (YahooFinance as any)();

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

export async function getQuote(symbol: string): Promise<QuoteSnapshot> {
  const q = await yf.quote(symbol);
  if (!q || !q.symbol) {
    throw new Error(`No quote data found for "${symbol}"`);
  }
  return q as QuoteSnapshot;
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

export async function getRatios(symbol: string): Promise<Ratios> {
  const summary = await yf.quoteSummary(symbol, {
    modules: ["summaryDetail", "defaultKeyStatistics", "financialData"],
  });

  const summaryDetail = summary.summaryDetail ?? {};
  const keyStats = summary.defaultKeyStatistics ?? {};
  const financialData = summary.financialData ?? {};

  return {
    trailingPE: summaryDetail.trailingPE ?? undefined,
    forwardPE: summaryDetail.forwardPE ?? keyStats.forwardPE ?? undefined,
    priceToBook: keyStats.priceToBook ?? undefined,
    priceToSales: summaryDetail.priceToSalesTrailing12Months ?? undefined,
    debtToEquity: financialData.debtToEquity ?? undefined,
    returnOnEquity: financialData.returnOnEquity ?? undefined,
    returnOnAssets: financialData.returnOnAssets ?? undefined,
    profitMargins: financialData.profitMargins ?? keyStats.profitMargins ?? undefined,
    operatingMargins: financialData.operatingMargins ?? undefined,
    grossMargins: financialData.grossMargins ?? undefined,
    dividendYield: summaryDetail.dividendYield ?? undefined,
    beta: summaryDetail.beta ?? undefined,
    trailingEps: keyStats.trailingEps ?? undefined,
    forwardEps: keyStats.forwardEps ?? undefined,
    revenueGrowth: financialData.revenueGrowth ?? undefined,
    earningsGrowth: financialData.earningsGrowth ?? undefined,
    currentRatio: financialData.currentRatio ?? undefined,
    quickRatio: financialData.quickRatio ?? undefined,
    totalCash: financialData.totalCash ?? undefined,
    totalDebt: financialData.totalDebt ?? undefined,
    freeCashflow: financialData.freeCashflow ?? undefined,
    targetMeanPrice: financialData.targetMeanPrice ?? undefined,
    recommendationKey: financialData.recommendationKey ?? undefined,
    numberOfAnalystOpinions: financialData.numberOfAnalystOpinions ?? undefined,
  };
}

export interface HistoricalPoint {
  date: string;
  close: number;
  volume?: number;
}

export async function getHistorical(symbol: string, days = 365): Promise<HistoricalPoint[]> {
  const period1 = new Date();
  period1.setDate(period1.getDate() - days);

  const result = await yf.chart(symbol, {
    period1,
    interval: days > 730 ? "1wk" : "1d",
  });

  return ((result.quotes ?? []) as any[])
    .filter((q) => q.close != null)
    .map((q) => ({
      date: new Date(q.date).toISOString().slice(0, 10),
      close: q.close as number,
      volume: q.volume ?? undefined,
    }));
}

export interface NewsItem {
  title: string;
  publisher?: string;
  link: string;
  providerPublishTime?: number;
}

export async function getNews(symbol: string, count = 8): Promise<NewsItem[]> {
  const result = await yf.search(symbol, { newsCount: count, quotesCount: 0 });
  return ((result.news ?? []) as any[]).map((n) => ({
    title: n.title,
    publisher: n.publisher,
    link: n.link,
    providerPublishTime:
      n.providerPublishTime instanceof Date
        ? n.providerPublishTime.getTime() / 1000
        : (n.providerPublishTime as number),
  }));
}
