import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function RainfallChart({ predictions }) {
  if (!predictions.length) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-500">
        No forecast data yet. Click &ldquo;Generate Forecast&rdquo; to run the
        model.
      </div>
    );
  }

  const chartData = predictions.map((p) => ({
    time: new Date(p.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    rainfall: p.rainfall_mm,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
          <YAxis
            stroke="#64748b"
            fontSize={12}
            label={{
              value: 'mm/hr',
              angle: -90,
              position: 'insideLeft',
              style: { fill: '#64748b', fontSize: 12 },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(value) => [`${value.toFixed(2)} mm/hr`, 'Rainfall']}
          />
          <Area
            type="monotone"
            dataKey="rainfall"
            stroke="#0ea5e9"
            strokeWidth={2}
            fill="url(#rainGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
