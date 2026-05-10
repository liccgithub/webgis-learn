import { loadCesium, createCesiumViewer } from './utils.js';

export default async function() {
  const container = document.getElementById('map-container');
  if (!container) return;

  try {
    await loadCesium();
    const Cesium = window.Cesium;
    const viewer = createCesiumViewer('map-container');

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(117.1000, 36.2500, 20000),
      orientation: { heading: Cesium.Math.toRadians(45), pitch: Cesium.Math.toRadians(-30), roll: 0 },
      duration: 3
    });

    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(117.1000, 36.2500),
      point: { pixelSize: 20, color: Cesium.Color.YELLOW, outlineColor: Cesium.Color.RED, outlineWidth: 4 },
      label: { text: '泰山 (海拔 1545m)', font: '18px sans-serif', fillColor: Cesium.Color.WHITE, verticalOrigin: Cesium.VerticalOrigin.BOTTOM, pixelOffset: new Cesium.Cartesian2(0, -30) }
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = '<div style="padding:20px;text-align:center;"><h3>加载失败</h3><p>' + error.message + '</p></div>';
  }
}
