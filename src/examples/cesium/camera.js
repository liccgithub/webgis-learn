import * as Cesium from 'cesium';
import { createCesiumViewer } from './utils.js';
import { registerInstance } from '../instanceManager.js';

export default async function() {
  const container = document.getElementById('map-container');
  if (!container) return;

  try {
    const viewer = createCesiumViewer('map-container');

    const cities = [
      { name: '北京', lon: 116.4074, lat: 39.9042 },
      { name: '上海', lon: 121.4737, lat: 31.2304 },
      { name: '广州', lon: 113.2644, lat: 23.1291 },
      { name: '成都', lon: 104.0668, lat: 30.5728 }
    ];

    cities.forEach(function(city) {
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(city.lon, city.lat),
        point: { pixelSize: 12, color: Cesium.Color.CYAN },
        label: { text: city.name, font: '14px sans-serif', fillColor: Cesium.Color.WHITE }
      });
    });

    viewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(105, 35, 5000000), duration: 2 });

    const savedViews = [];
    const infoDiv = document.createElement('div');
    infoDiv.className = 'cesium-info-panel';

    function updatePanel() {
      const pos = viewer.camera.positionCartographic;
      infoDiv.innerHTML = `
        <h4>相机控制</h4>
        <p>经度: ${Cesium.Math.toDegrees(pos.longitude).toFixed(4)}°</p>
        <p>纬度: ${Cesium.Math.toDegrees(pos.latitude).toFixed(4)}°</p>
        <p>高度: ${(pos.height / 1000).toFixed(1)} km</p>
        <div style="margin-top:10px; display:flex; flex-direction:column; gap:4px;">
          ${cities.map((city, i) =>
            `<button class="fly-btn" data-city="${i}" style="
              padding: 6px 10px; font-size: 12px; cursor: pointer;
              background: rgba(184,86,62,0.3); color: #fff;
              border: 1px solid rgba(184,86,62,0.5); border-radius: 3px;
            ">飞往 ${city.name}</button>`
          ).join('')}
          <button id="save-view-btn" style="
            padding: 6px 10px; font-size: 12px; cursor: pointer;
            background: rgba(107,143,110,0.4); color: #fff;
            border: 1px solid rgba(107,143,110,0.6); border-radius: 3px; margin-top: 4px;
          ">保存当前视角</button>
          ${savedViews.length > 0 ? `
            <button id="restore-view-btn" style="
              padding: 6px 10px; font-size: 12px; cursor: pointer;
              background: rgba(181,160,109,0.3); color: #fff;
              border: 1px solid rgba(181,160,109,0.5); border-radius: 3px;
            ">恢复视角 (${savedViews.length})</button>
          ` : ''}
        </div>
      `;
    }

    updatePanel();
    container.appendChild(infoDiv);

    viewer.camera.moveEnd.addEventListener(updatePanel);

    infoDiv.addEventListener('click', (e) => {
      const flyBtn = e.target.closest('.fly-btn');
      if (flyBtn) {
        const city = cities[parseInt(flyBtn.dataset.city)];
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(city.lon, city.lat, 100000),
          duration: 2
        });
        return;
      }
      if (e.target.id === 'save-view-btn') {
        savedViews.push({
          position: Cesium.Cartesian3.clone(viewer.camera.position),
          direction: Cesium.Cartesian3.clone(viewer.camera.direction),
          up: Cesium.Cartesian3.clone(viewer.camera.up)
        });
        updatePanel();
        return;
      }
      if (e.target.id === 'restore-view-btn' && savedViews.length > 0) {
        const view = savedViews[savedViews.length - 1];
        viewer.camera.setView({ position: view.position, direction: view.direction, up: view.up });
      }
    });

    registerInstance(viewer);
  } catch (error) {
    console.error(error);
    container.innerHTML = '<div style="padding:20px;text-align:center;"><h3>加载失败</h3><p>' + error.message + '</p></div>';
  }
}
