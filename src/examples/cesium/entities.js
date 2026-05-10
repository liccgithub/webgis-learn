import { loadCesium, createCesiumViewer } from './utils.js';

export default async function() {
  const container = document.getElementById('map-container');
  if (!container) return;

  try {
    await loadCesium();
    const Cesium = window.Cesium;
    const viewer = createCesiumViewer('map-container');

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 20000),
      duration: 2
    });

    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042),
      point: { pixelSize: 15, color: Cesium.Color.RED, outlineColor: Cesium.Color.WHITE, outlineWidth: 3 },
      label: { text: '天安门广场', font: '16px sans-serif', fillColor: Cesium.Color.WHITE, verticalOrigin: Cesium.VerticalOrigin.BOTTOM, pixelOffset: new Cesium.Cartesian2(0, -20) }
    });

    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(116.3972, 39.9163),
      billboard: { image: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="15" fill="#f39c12" stroke="#fff" stroke-width="3"/></svg>'), scale: 1.0 },
      label: { text: '故宫', font: '14px sans-serif', fillColor: Cesium.Color.WHITE }
    });

    viewer.entities.add({
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([116.4074, 39.9042, 116.3972, 39.9163, 116.3900, 39.9350]),
        width: 5, material: Cesium.Material.fromType('PolylineGlow', { glowPower: 0.2, color: Cesium.Color.CYAN })
      }
    });

    viewer.entities.add({
      polygon: { hierarchy: Cesium.Cartesian3.fromDegreesArray([116.2655, 39.9905, 116.2855, 39.9905, 116.2855, 40.0105, 116.2655, 40.0105]), material: Cesium.Color.GREEN.withAlpha(0.5), outline: true, outlineColor: Cesium.Color.WHITE },
      label: { text: '颐和园区域', font: '14px sans-serif', fillColor: Cesium.Color.WHITE }
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = '<div style="padding:20px;text-align:center;"><h3>加载失败</h3><p>' + error.message + '</p></div>';
  }
}
