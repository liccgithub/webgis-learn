import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { registerInstance } from '../instanceManager.js';

export default function() {
  const container = document.getElementById('map-container');
  if (!container) return;

  const map = L.map('map-container', { zoomControl: false }).setView([39.9042, 116.4074], 12);
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    subdomains: ['1', '2', '3', '4'],
    attribution: '&copy; 高德地图'
  }).addTo(map);

  L.marker([39.9042, 116.4074]).addTo(map).bindPopup('天安门广场').openPopup();

  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div style="background: #ff6b6b; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
  L.marker([39.9163, 116.3972], { icon: customIcon }).addTo(map).bindPopup('故宫博物院');

  L.circleMarker([40.0005, 116.2755], {
    radius: 15, fillColor: '#4ecdc4', color: '#fff', weight: 3, opacity: 1, fillOpacity: 0.8
  }).addTo(map).bindPopup('颐和园');

  L.circle([39.9200, 116.4600], {
    radius: 2000, fillColor: '#f39c12', color: '#e67e22', weight: 2, opacity: 0.8, fillOpacity: 0.2
  }).addTo(map).bindPopup('半径 2km 区域');

  registerInstance(map);
  map.invalidateSize(true);
}
