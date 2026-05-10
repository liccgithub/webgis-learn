// Leaflet 图层控制示例
export default function() {
  const L = window.L;
  if (!L) { console.error('Leaflet 未加载'); return; }
  const container = document.getElementById('map-container');

  setTimeout(function() {
    container.style.height = '100%';
    container.style.width = '100%';
    const map = L.map('map-container', { zoomControl: false }).setView([39.9042, 116.4074], 11);
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const baseMaps = {
      'OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }),
      '卫星影像': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; Esri' }),
      '暗色主题': L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; CARTO' })
    };

    baseMaps['OpenStreetMap'].addTo(map);

    const overlayMaps = {
      '兴趣点': L.layerGroup([L.marker([39.9042, 116.4074]).bindPopup('天安门'), L.marker([39.9163, 116.3972]).bindPopup('故宫'), L.marker([40.0005, 116.2755]).bindPopup('颐和园')]),
      '区域范围': L.layerGroup([L.circle([39.9200, 116.4600], { radius: 2000, color: '#e74c3c', fillOpacity: 0.1 }), L.circle([39.9500, 116.3500], { radius: 3000, color: '#3498db', fillOpacity: 0.1 })]),
      '路线': L.polyline([[39.9042, 116.4074], [39.9163, 116.3972], [40.0005, 116.2755]], { color: '#2ecc71', weight: 4 })
    };

    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
    overlayMaps['兴趣点'].addTo(map);
    overlayMaps['路线'].addTo(map);

    setTimeout(function() { map.invalidateSize(true); }, 100);
    console.log('Leaflet 图层控制示例已加载');
  }, 50);
}
