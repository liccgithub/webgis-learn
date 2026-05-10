import { loadCesium, createCesiumViewer } from './utils.js';

export default async function() {
  const container = document.getElementById('map-container');
  if (!container) return;

  try {
    await loadCesium();
    const Cesium = window.Cesium;
    const viewer = createCesiumViewer('map-container', { baseLayerPicker: true });

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 50000),
      duration: 2
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = '<div style="padding:20px;text-align:center;"><h3>加载失败</h3><p>' + error.message + '</p></div>';
  }
}
