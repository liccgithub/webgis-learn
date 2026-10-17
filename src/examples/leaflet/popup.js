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

  L.marker([39.9042, 116.4074])
    .bindPopup('<div style="padding: 10px;"><h3 style="margin: 0 0 10px 0;">天安门广场</h3><p style="margin: 0; color: #666;">北京市中心的标志性广场</p></div>')
    .addTo(map);

  L.marker([39.9163, 116.3972])
    .bindTooltip('故宫博物院 - 鼠标悬停查看', { direction: 'top', offset: [0, -10] })
    .addTo(map)
    .bindPopup('<b>故宫博物院</b><br>中国明清两代的皇家宫殿');

  map.on('click', function(e) {
    L.popup()
      .setLatLng(e.latlng)
      .setContent(
        '<div style="padding: 10px;"><h4>点击位置</h4>' +
        '<p>纬度: ' + e.latlng.lat.toFixed(6) + '</p>' +
        '<p>经度: ' + e.latlng.lng.toFixed(6) + '</p></div>'
      )
      .openOn(map);
  });

  registerInstance(map);
  map.invalidateSize(true);
}
