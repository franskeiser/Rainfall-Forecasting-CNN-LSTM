import { Routes, Route } from 'react-router-dom';
import Layout from './components/ui/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MapPage from './pages/MapPage';
import Forecast from './pages/Forecast';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="map" element={<MapPage />} />
        <Route path="forecast" element={<Forecast />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
