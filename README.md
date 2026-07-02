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
npm run install:all   # installs root, backend, and frontend deps
npm run dev           # runs backend (:4000) and frontend (:5173) together
```

Open http://localhost:5173 and search a ticker (e.g. AAPL, MSFT, TSLA). The
Vite dev server proxies `/api/*` requests to the backend, so no extra config
is needed locally.

To run them separately instead:

```bash
cd backend && npm install && npm run dev    # http://localhost:4000
cd frontend && npm install && npm run dev   # http://localhost:5173
```

## Disclaimer

The "prediction" panel is a transparent heuristic (moving averages + trend
slope on recent prices), not a statistical or ML forecast, and is not
investment advice.
