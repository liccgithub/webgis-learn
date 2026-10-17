import * as Cesium from 'cesium';
import { createCesiumViewer } from './utils.js';
import { registerInstance } from '../instanceManager.js';

export default async function() {
  const container = document.getElementById('map-container');
  if (!container) return;

  try {
    const viewer = createCesiumViewer('map-container', { baseLayerPicker: false });

    const imageryLayers = [
      {
        name: '高德矢量',
        create: () => new Cesium.UrlTemplateImageryProvider({
          url: 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
          subdomains: ['1', '2', '3', '4'],
          maximumLevel: 18
        })
      },
      {
        name: '高德卫星',
        create: () => new Cesium.UrlTemplateImageryProvider({
          url: 'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
          subdomains: ['1', '2', '3', '4'],
          maximumLevel: 18
        })
      },
      {
        name: 'CartoDB 暗色',
        create: () => new Cesium.UrlTemplateImageryProvider({
          url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
          subdomains: ['a', 'b', 'c', 'd']
        })
      },
      {
        name: 'CartoDB 亮色',
        create: () => new Cesium.UrlTemplateImageryProvider({
          url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
          subdomains: ['a', 'b', 'c', 'd']
        })
      }
    ];

    async function switchTo(index) {
      viewer.imageryLayers.removeAll();
      const provider = await imageryLayers[index].create();
      viewer.imageryLayers.addImageryProvider(provider);
    }

    await switchTo(0);

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 50000),
      duration: 2
    });

    let currentIndex = 0;
    const infoDiv = document.createElement('div');
    infoDiv.className = 'cesium-info-panel';

    function updatePanel() {
      infoDiv.innerHTML = `
        <h4>影像服务示例</h4>
        <p>当前底图: <strong>${imageryLayers[currentIndex].name}</strong></p>
        <p style="margin-top:10px;">点击按钮切换底图:</p>
        <div style="margin-top:8px; display:flex; flex-wrap:wrap; gap:4px;">
          ${imageryLayers.map((layer, i) =>
            `<button class="imagery-btn" data-index="${i}" style="
              padding: 4px 8px; font-size: 12px; cursor: pointer;
              background: ${i === currentIndex ? '#b8563e' : 'rgba(255,255,255,0.15)'};
              color: ${i === currentIndex ? '#fff' : '#ccc'};
              border: 1px solid rgba(255,255,255,0.3); border-radius: 3px;
            ">${layer.name}</button>`
          ).join('')}
        </div>
      `;
    }

    updatePanel();
    container.appendChild(infoDiv);

    infoDiv.addEventListener('click', async (e) => {
      const btn = e.target.closest('.imagery-btn');
      if (!btn) return;
      const idx = parseInt(btn.dataset.index);
      if (idx === currentIndex) return;

      await switchTo(idx);
      currentIndex = idx;
      updatePanel();
    });

    registerInstance(viewer);
  } catch (error) {
    console.error(error);
    container.innerHTML = '<div style="padding:20px;text-align:center;"><h3>加载失败</h3><p>' + error.message + '</p></div>';
  }
}
