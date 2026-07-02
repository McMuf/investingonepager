# investingonepager

A stock pitch one-pager: type a ticker, get a Yahoo-Finance-dark-mode style
snapshot with key ratios, KPIs, a price chart, news sentiment, and a simple
trend indicator.

## Stack

- `backend/` — Express + TypeScript API, powered by `yahoo-finance2` (no API
  key required) and lightweight lexicon-based sentiment scoring.
- `frontend/` — React + Vite + TypeScript + Tailwind, dark theme, Recharts.

## Development

```bash
# backend (http://localhost:4000)
cd backend && npm install && npm run dev

# frontend (http://localhost:5173)
cd frontend && npm install && npm run dev
```

## Disclaimer

The "prediction" panel is a transparent heuristic (moving averages + trend
slope on recent prices), not a statistical or ML forecast, and is not
investment advice.
