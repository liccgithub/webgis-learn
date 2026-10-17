import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { registerInstance } from '../instanceManager.js';

export default function() {
  const container = document.getElementById('map-container');
  if (!container) return;

  const map = L.map('map-container', { zoomControl: false }).setView([39.9042, 116.4074], 11);
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  const baseMaps = {
    '高德矢量': L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', { subdomains: ['1','2','3','4'], attribution: '&copy; 高德地图' }),
    '高德卫星': L.tileLayer('https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', { subdomains: ['1','2','3','4'], attribution: '&copy; 高德地图' }),
    'OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }),
    '暗色主题': L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; CARTO' })
  };
  baseMaps['高德矢量'].addTo(map);

  const overlayMaps = {
    '兴趣点': L.layerGroup([
      L.marker([39.9042, 116.4074]).bindPopup('天安门'),
      L.marker([39.9163, 116.3972]).bindPopup('故宫'),
      L.marker([40.0005, 116.2755]).bindPopup('颐和园')
    ]),
    '区域范围': L.layerGroup([
      L.circle([39.9200, 116.4600], { radius: 2000, color: '#e74c3c', fillOpacity: 0.1 }),
      L.circle([39.9500, 116.3500], { radius: 3000, color: '#3498db', fillOpacity: 0.1 })
    ]),
    '路线': L.polyline(
      [[39.9042, 116.4074], [39.9163, 116.3972], [40.0005, 116.2755]],
      { color: '#2ecc71', weight: 4 }
    )
  };

  L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
  overlayMaps['兴趣点'].addTo(map);
  overlayMaps['路线'].addTo(map);

  registerInstance(map);
  map.invalidateSize(true);
}
