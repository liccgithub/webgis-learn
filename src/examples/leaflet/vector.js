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

  L.polyline(
    [[39.9042, 116.4074], [39.9163, 116.3972], [39.9800, 116.4200], [40.0005, 116.2755]],
    { color: '#3498db', weight: 5, opacity: 0.8, dashArray: '10, 10' }
  ).addTo(map).bindPopup('北京市景点连线');

  L.polygon(
    [[39.9000, 116.3800], [39.9200, 116.3800], [39.9200, 116.4200], [39.9000, 116.4200]],
    { color: '#e74c3c', weight: 3, fillColor: '#e74c3c', fillOpacity: 0.2 }
  ).addTo(map).bindPopup('北京市中心区域');

  L.rectangle(
    [[39.9700, 116.3800], [39.9900, 116.4200]],
    { color: '#2ecc71', weight: 3, fillColor: '#2ecc71', fillOpacity: 0.2 }
  ).addTo(map).bindPopup('奥林匹克公园区域');

  L.circle(
    [39.8800, 116.3600],
    { radius: 1500, color: '#f39c12', fillColor: '#f39c12', fillOpacity: 0.2 }
  ).addTo(map).bindPopup('丰台科技园区');

  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = function() {
    const div = L.DomUtil.create('div', 'legend');
    div.style.background = 'white';
    div.style.padding = '10px';
    div.style.borderRadius = '5px';
    div.innerHTML =
      '<h4 style="margin: 0 0 10px 0;">图例</h4>' +
      '<div><span style="display:inline-block;width:20px;height:3px;background:#3498db;vertical-align:middle;"></span> 景点连线</div>' +
      '<div><span style="display:inline-block;width:20px;height:12px;background:#e74c3c;opacity:0.2;border:1px solid #e74c3c;vertical-align:middle;"></span> 中心区域</div>';
    return div;
  };
  legend.addTo(map);

  registerInstance(map);
  map.invalidateSize(true);
}
