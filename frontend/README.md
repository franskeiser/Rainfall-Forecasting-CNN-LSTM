# Frontend — React + Vite + Axios (JavaScript)

A single-page React application built with Vite, written in plain JavaScript (JSX, no TypeScript). Uses Axios for API calls, React Router for navigation, TanStack Query for data fetching, Leaflet for maps, and Recharts for charts.

## Setup

```bash
# From the frontend/ directory
cp .env.example .env
npm install
```

## Run Locally

```bash
npm run dev
```

Open http://localhost:3000. The dev server reloads on save.

Make sure the backend is running at http://localhost:8000 (see `backend/README.md`).

## Scripts

```bash
npm run dev          # Dev server with hot reload
npm run build        # Production build (outputs to dist/)
npm run preview      # Serve the production build locally
npm run lint         # ESLint
npm run format       # Prettier
```

## Project Layout

```
src/
├── components/
│   ├── charts/       Recharts wrappers (RainfallChart)
│   ├── map/          Leaflet map (FloodRiskMap)
│   └── ui/           Shared UI (Layout, HealthBadge)
├── hooks/
│   └── useApi.js     React Query hooks for every endpoint
├── lib/
│   └── api.js        Axios instance + API functions
├── pages/
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── MapPage.jsx
│   ├── Forecast.jsx
│   └── NotFound.jsx
├── styles/
│   └── index.css     Tailwind directives + resets
├── App.jsx           Route definitions
└── main.jsx          React entry point
```

## Environment Variables

All env vars must be prefixed with `VITE_` to be exposed to the app.

```
VITE_API_URL=http://localhost:8000
VITE_MAPBOX_TOKEN=     # (optional) if switching from OSM tiles
```

## Adding a New Endpoint

1. Add the Axios call to `src/lib/api.js`
2. Wrap it in a React Query hook in `src/hooks/useApi.js`
3. Use the hook in any page component
