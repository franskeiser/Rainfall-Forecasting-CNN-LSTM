/**
 * Axios client for the Manila Flood Forecast backend.
 */
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global error logger (replace with toast or error boundary as needed)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `[API] ${error.response.status} ${error.config?.url}`,
        error.response.data
      );
    } else if (error.request) {
      console.error('[API] No response received', error.message);
    } else {
      console.error('[API] Request setup error', error.message);
    }
    return Promise.reject(error);
  }
);

// ---- API calls ----
export async function getForecast(request) {
  const { data } = await apiClient.post('/api/v1/forecast/', request);
  return data;
}

export async function getLatestForecast() {
  const { data } = await apiClient.get('/api/v1/forecast/latest');
  return data;
}

export async function getFloodRiskMap() {
  const { data } = await apiClient.get('/api/v1/flood-risk/map');
  return data;
}

export async function getBarangayRisk(barangay) {
  const { data } = await apiClient.get(`/api/v1/flood-risk/zones/${barangay}`);
  return data;
}

export async function getGISLayers() {
  const { data } = await apiClient.get('/api/v1/gis/layers');
  return data;
}

export async function healthCheck() {
  const { data } = await apiClient.get('/health');
  return data;
}
