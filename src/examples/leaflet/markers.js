// Leaflet 标记与图标示例
export default function() {
  const L = window.L;
  if (!L) { console.error('Leaflet 未加载'); return; }
  const container = document.getElementById('map-container');
  
  setTimeout(function() {
    container.style.height = '100%';
    container.style.width = '100%';
    const map = L.map('map-container', { zoomControl: false }).setView([39.9042, 116.4074], 12);
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const marker1 = L.marker([39.9042, 116.4074]).addTo(map).bindPopup('天安门广场').openPopup();

    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="background: #ff6b6b; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    L.marker([39.9163, 116.3972], { icon: customIcon }).addTo(map).bindPopup('故宫博物院');
    L.circleMarker([40.0005, 116.2755], { radius: 15, fillColor: '#4ecdc4', color: '#fff', weight: 3, opacity: 1, fillOpacity: 0.8 }).addTo(map).bindPopup('颐和园');
    L.circle([39.9200, 116.4600], { radius: 2000, fillColor: '#f39c12', color: '#e67e22', weight: 2, opacity: 0.8, fillOpacity: 0.2 }).addTo(map).bindPopup('半径 2km 区域');

    setTimeout(function() { map.invalidateSize(true); }, 100);
    console.log('Leaflet 标记示例已加载');
  }, 50);
}
