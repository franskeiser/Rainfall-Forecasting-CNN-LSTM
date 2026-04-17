import { useState } from 'react';
import { CloudRain, Loader2 } from 'lucide-react';
import { useForecastMutation } from '@/hooks/useApi';
import RainfallChart from '@/components/charts/RainfallChart';

export default function Forecast() {
  const [horizon, setHorizon] = useState(24);
  const mutation = useForecastMutation();

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Forecast</h2>
        <p className="text-sm text-slate-600">
          Generate a short-term rainfall forecast for the City of Manila
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-6 grid grid-cols-3 gap-3">
          {[24, 48, 72].map((h) => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              className={
                horizon === h
                  ? 'rounded-lg border-2 border-sky-500 bg-sky-50 p-4 text-center'
                  : 'rounded-lg border-2 border-slate-200 bg-white p-4 text-center hover:border-slate-300'
              }
            >
              <p className="text-2xl font-bold text-slate-900">{h}h</p>
              <p className="text-xs text-slate-500">Horizon</p>
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            mutation.mutate({ horizon_hours: horizon, location: 'manila' })
          }
          disabled={mutation.isPending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-3 font-medium text-white hover:bg-sky-700 disabled:opacity-50"
        >
          {mutation.isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <CloudRain className="h-5 w-5" />
          )}
          Generate {horizon}-hour Forecast
        </button>

        {mutation.isError && (
          <p className="mt-4 text-sm text-red-600">
            Could not generate forecast. Verify the backend is running.
          </p>
        )}
      </div>

      {mutation.data && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              Prediction
            </h3>
            <span className="text-xs text-slate-500">
              Generated{' '}
              {new Date(mutation.data.generated_at).toLocaleString()} · Model{' '}
              {mutation.data.model_version}
            </span>
          </div>
          <RainfallChart predictions={mutation.data.predictions} />
        </div>
      )}
    </div>
  );
}
