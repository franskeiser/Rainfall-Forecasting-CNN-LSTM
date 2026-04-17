/**
 * React Query hooks for backend data.
 */
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getFloodRiskMap,
  getForecast,
  getGISLayers,
  getLatestForecast,
  healthCheck,
} from '@/lib/api';

export function useHealth() {
  return useQuery({
    queryKey: ['health'],
    queryFn: healthCheck,
    refetchInterval: 30_000,
  });
}

export function useLatestForecast() {
  return useQuery({
    queryKey: ['forecast', 'latest'],
    queryFn: getLatestForecast,
  });
}

export function useForecastMutation() {
  return useMutation({
    mutationFn: (req) => getForecast(req),
  });
}

export function useFloodRiskMap() {
  return useQuery({
    queryKey: ['flood-risk', 'map'],
    queryFn: getFloodRiskMap,
  });
}

export function useGISLayers() {
  return useQuery({
    queryKey: ['gis', 'layers'],
    queryFn: getGISLayers,
  });
}
