import FloodRiskMap from '@/components/map/FloodRiskMap';
import { useFloodRiskMap } from '@/hooks/useApi';

export default function MapPage() {
  const { data, isLoading, isError } = useFloodRiskMap();

  return (
    <div className="mx-auto flex h-full max-w-7xl flex-col px-6 py-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-900">Flood Risk Map</h2>
        <p className="text-sm text-slate-600">
          Interactive map showing predicted flood risk across Manila barangays
        </p>
      </div>

      <div className="flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {isLoading && (
          <div className="flex h-full items-center justify-center text-slate-500">
            Loading map data...
          </div>
        )}
        {isError && (
          <div className="flex h-full items-center justify-center text-red-600">
            Could not load flood risk data. Is the backend running?
          </div>
        )}
        {data && <FloodRiskMap geojson={data} />}
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm">
        <span className="font-medium text-slate-700">Risk levels:</span>
        <LegendItem color="bg-risk-low" label="Low" />
        <LegendItem color="bg-risk-moderate" label="Moderate" />
        <LegendItem color="bg-risk-high" label="High" />
        <LegendItem color="bg-risk-very_high" label="Very High" />
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded ${color}`} aria-hidden="true" />
      <span className="text-slate-600">{label}</span>
    </div>
  );
}
