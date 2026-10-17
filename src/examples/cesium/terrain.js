import * as Cesium from 'cesium';
import { createCesiumViewer } from './utils.js';
import { registerInstance } from '../instanceManager.js';

export default async function() {
  const container = document.getElementById('map-container');
  if (!container) return;

  try {
    const viewer = createCesiumViewer('map-container');

    const terrain = await Cesium.CesiumTerrainProvider.fromUrl(
      'https://terrain.assets.ion.cesium.com/1',
      { requestVertexNormals: true }
    );
    viewer.terrainProvider = terrain;
    viewer.scene.globe.enableLighting = true;

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(117.1000, 36.2500, 25000),
      orientation: {
        heading: Cesium.Math.toRadians(45),
        pitch: Cesium.Math.toRadians(-35),
        roll: 0
      },
      duration: 3
    });

    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(117.1000, 36.2500),
      point: { pixelSize: 20, color: Cesium.Color.YELLOW, outlineColor: Cesium.Color.RED, outlineWidth: 4 },
      label: {
        text: '泰山 (海拔 1545m)',
        font: '18px sans-serif',
        fillColor: Cesium.Color.WHITE,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -30)
      }
    });

    const infoDiv = document.createElement('div');
    infoDiv.className = 'cesium-info-panel';
    infoDiv.innerHTML = `
      <h4>地形服务示例</h4>
      <p>使用 Cesium World Terrain 全球地形数据</p>
      <p>启用了顶点法线 (requestVertexNormals) 以展示光照效果</p>
      <p>开启地形光照 (enableLighting)</p>
      <p>目标: 泰山 (117.1°E, 36.25°N)</p>
    `;
    container.appendChild(infoDiv);

    registerInstance(viewer);
  } catch (error) {
    console.error(error);
    container.innerHTML = '<div style="padding:20px;text-align:center;"><h3>加载失败</h3><p>' + error.message + '</p></div>';
  }
}
