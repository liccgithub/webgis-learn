// Leaflet 弹窗交互示例
export default function() {
  const L = window.L;
  if (!L) { console.error('Leaflet 未加载'); return; }
  const container = document.getElementById('map-container');

  setTimeout(function() {
    container.style.height = '100%';
    container.style.width = '100%';
    const map = L.map('map-container', { zoomControl: false }).setView([39.9042, 116.4074], 12);
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(map);

    const marker1 = L.marker([39.9042, 116.4074]).bindPopup('<div style="padding: 10px;"><h3 style="margin: 0 0 10px 0;">天安门广场</h3><p style="margin: 0; color: #666;">北京市中心的标志性广场</p></div>').addTo(map);

    L.marker([39.9163, 116.3972]).bindTooltip('故宫博物院 - 鼠标悬停查看', { direction: 'top', offset: [0, -10] }).addTo(map).bindPopup('<b>故宫博物院</b><br>中国明清两代的皇家宫殿');

    map.on('click', function(e) {
      L.popup().setLatLng(e.latlng).setContent('<div style="padding: 10px;"><h4>点击位置</h4><p>纬度: ' + e.latlng.lat.toFixed(6) + '</p><p>经度: ' + e.latlng.lng.toFixed(6) + '</p></div>').openOn(map);
    });

    marker1.openPopup();

    setTimeout(function() { map.invalidateSize(true); }, 100);
    console.log('Leaflet 弹窗交互示例已加载');
  }, 50);
}
