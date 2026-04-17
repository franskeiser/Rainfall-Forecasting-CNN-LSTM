import { NavLink, Outlet } from 'react-router-dom';
import { CloudRain, Map, BarChart3, Home } from 'lucide-react';
import clsx from 'clsx';
import HealthBadge from './HealthBadge';

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/map', label: 'Risk Map', icon: Map },
  { to: '/forecast', label: 'Forecast', icon: CloudRain },
];

export default function Layout() {
  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500 text-white">
              <CloudRain className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">
                Manila Flood Forecast
              </h1>
              <p className="text-xs text-slate-500">
                Multi-Stream CNN-LSTM · PUP Graduate School
              </p>
            </div>
          </div>
          <HealthBadge />
        </div>
        <nav className="mx-auto max-w-7xl px-6">
          <ul className="flex gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    clsx(
                      'inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'border-sky-500 text-sky-600'
                        : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900'
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-3 text-center text-xs text-slate-500">
        Polytechnic University of the Philippines · Graduate School · 2027
      </footer>
    </div>
  );
}
