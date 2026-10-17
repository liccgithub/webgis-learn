import * as Cesium from 'cesium';
import { createCesiumViewer } from './utils.js';
import { registerInstance } from '../instanceManager.js';

export default async function() {
  const container = document.getElementById('map-container');
  if (!container) return;

  try {
    const viewer = createCesiumViewer('map-container');

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 10000),
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-45),
        roll: 0
      },
      duration: 2
    });

    registerInstance(viewer);
  } catch (error) {
    console.error('加载失败:', error);
    container.innerHTML = '<div style="padding:20px;text-align:center;"><h3>加载失败</h3><p>' + error.message + '</p></div>';
  }
}
