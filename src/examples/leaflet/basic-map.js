// Leaflet 基础地图示例
export default function() {
  const container = document.getElementById('map-container');
  if (!container) return;
  const L = window.L;
  if (!L) { console.error('Leaflet 未加载'); return; }

  setTimeout(function() {
    container.style.height = '100%';
    container.style.width = '100%';
    const map = L.map('map-container', { zoomControl: false }).setView([39.9042, 116.4074], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    setTimeout(function() { map.invalidateSize(true); }, 100);
    console.log('Leaflet 基础地图已加载');
  }, 50);
}
