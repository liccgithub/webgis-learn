import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { registerInstance } from '../instanceManager.js';

export default function() {
  const container = document.getElementById('map-container');
  if (!container) return;

  const map = L.map('map-container', { zoomControl: false }).setView([39.9042, 116.4074], 12);

  L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    subdomains: ['1', '2', '3', '4'],
    attribution: '&copy; 高德地图',
    maxZoom: 18
  }).addTo(map);

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  registerInstance(map);
  map.invalidateSize(true);
}
