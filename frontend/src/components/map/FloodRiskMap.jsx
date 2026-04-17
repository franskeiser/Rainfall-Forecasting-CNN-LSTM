import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

// Manila centroid
const MANILA_CENTER = [14.5995, 120.9842];
const DEFAULT_ZOOM = 12;

const riskColors = {
  low: '#22c55e',
  moderate: '#eab308',
  high: '#f97316',
  very_high: '#dc2626',
};

function styleFeature(feature) {
  const level = feature?.properties?.risk_level ?? 'low';
  return {
    fillColor: riskColors[level] ?? '#94a3b8',
    fillOpacity: 0.55,
    color: '#1e293b',
    weight: 1,
  };
}

function onEachFeature(feature, layer) {
  const props = feature.properties ?? {};
  const name = props.barangay_id ?? props.name ?? 'Unknown';
  const level = props.risk_level ?? 'n/a';
  const score =
    typeof props.risk_score === 'number' ? props.risk_score.toFixed(2) : 'n/a';
  layer.bindPopup(
    `<div style="font-size:13px">
      <strong>${name}</strong><br/>
      Risk level: ${level}<br/>
      Risk score: ${score}
    </div>`
  );
}

export default function FloodRiskMap({ geojson }) {
  return (
    <MapContainer
      center={MANILA_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geojson.features.length > 0 && (
        <GeoJSON
          data={geojson}
          style={styleFeature}
          onEachFeature={onEachFeature}
        />
      )}
    </MapContainer>
  );
}
