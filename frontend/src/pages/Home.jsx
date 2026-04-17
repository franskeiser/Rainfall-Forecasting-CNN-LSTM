import { Link } from 'react-router-dom';
import { BarChart3, Map, CloudRain, ArrowRight } from 'lucide-react';

const cards = [
  {
    to: '/dashboard',
    title: 'Dashboard',
    description: 'Rainfall forecasts and historical analytics',
    icon: BarChart3,
    color: 'bg-sky-500',
  },
  {
    to: '/map',
    title: 'Flood Risk Map',
    description: 'Interactive per-barangay flood risk visualization',
    icon: Map,
    color: 'bg-emerald-500',
  },
  {
    to: '/forecast',
    title: 'Forecast',
    description: '24 / 48 / 72-hour rainfall predictions',
    icon: CloudRain,
    color: 'bg-indigo-500',
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900">
          Rainfall Forecasting & Flood Risk Assessment
        </h2>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          A dissertation project using a multi-stream CNN-LSTM architecture
          integrated with GIS for short-term rainfall prediction and dynamic
          flood risk mapping in the City of Manila.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div
              className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${card.color} text-white`}
            >
              <card.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{card.description}</p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-600 group-hover:gap-2 transition-all">
              Open <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-16 rounded-xl border border-slate-200 bg-white p-8">
        <h3 className="text-xl font-semibold text-slate-900">
          About this project
        </h3>
        <p className="mt-3 text-slate-600">
          Traditional rainfall forecasting approaches use early fusion of
          spatial and temporal features, which limits their ability to capture
          the complex dynamics of urban rainfall. This system uses a
          multi-stream architecture where CNN and LSTM encoders independently
          process spatial (radar, gridded rainfall) and temporal (station time
          series) inputs before late fusion — then feeds the predicted rainfall
          into a GIS overlay analysis to produce dynamic flood risk maps.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
          <div>
            <p className="font-medium text-slate-900">Coverage</p>
            <p className="text-slate-600">City of Manila, 897 barangays</p>
          </div>
          <div>
            <p className="font-medium text-slate-900">Forecast horizon</p>
            <p className="text-slate-600">24 / 48 / 72 hours</p>
          </div>
          <div>
            <p className="font-medium text-slate-900">Model</p>
            <p className="text-slate-600">Multi-Stream CNN-LSTM v0.1.0</p>
          </div>
        </div>
      </section>
    </div>
  );
}
