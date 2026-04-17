import { useState } from 'react';
import RainfallChart from '@/components/charts/RainfallChart';
import { useForecastMutation } from '@/hooks/useApi';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [horizon, setHorizon] = useState(24);
  const forecast = useForecastMutation();

  const handleGenerate = () => {
    forecast.mutate({ horizon_hours: horizon, location: 'manila' });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-sm text-slate-600">
            Generate rainfall forecasts and review recent trends
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-lg border border-slate-200 bg-white p-1">
            {[24, 48, 72].map((h) => (
              <button
                key={h}
                onClick={() => setHorizon(h)}
                className={
                  horizon === h
                    ? 'rounded-md bg-sky-500 px-3 py-1.5 text-sm font-medium text-white'
                    : 'rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100'
                }
              >
                {h}h
              </button>
            ))}
          </div>
          <button
            onClick={handleGenerate}
            disabled={forecast.isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-50"
          >
            {forecast.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Generate Forecast
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <StatCard label="Horizon" value={`${horizon} hours`} />
        <StatCard
          label="Model Version"
          value={forecast.data?.model_version ?? 'v0.1.0'}
        />
        <StatCard
          label="Predictions"
          value={String(forecast.data?.predictions.length ?? 0)}
        />
        <StatCard
          label="Last Run"
          value={
            forecast.data
              ? new Date(forecast.data.generated_at).toLocaleTimeString()
              : '—'
          }
        />
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Rainfall Forecast ({horizon}h)
        </h3>
        {forecast.isError && (
          <p className="text-sm text-red-600">
            Could not generate forecast. Is the backend running?
          </p>
        )}
        <RainfallChart predictions={forecast.data?.predictions ?? []} />
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}
