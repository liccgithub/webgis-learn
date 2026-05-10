import { loadCesium, createCesiumViewer } from './utils.js';

export default async function() {
  const container = document.getElementById('map-container');
  if (!container) return;

  try {
    await loadCesium();
    const Cesium = window.Cesium;
    const viewer = createCesiumViewer('map-container');

    const cities = [{ name: '北京', lon: 116.4074, lat: 39.9042 }, { name: '上海', lon: 121.4737, lat: 31.2304 }, { name: '广州', lon: 113.2644, lat: 23.1291 }, { name: '成都', lon: 104.0668, lat: 30.5728 }];

    cities.forEach(function(city) {
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(city.lon, city.lat),
        point: { pixelSize: 12, color: Cesium.Color.CYAN },
        label: { text: city.name, font: '14px sans-serif', fillColor: Cesium.Color.WHITE }
      });
    });

    viewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(105, 35, 5000000), duration: 2 });
  } catch (error) {
    console.error(error);
    container.innerHTML = '<div style="padding:20px;text-align:center;"><h3>加载失败</h3><p>' + error.message + '</p></div>';
  }
}
