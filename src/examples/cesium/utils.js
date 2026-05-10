// Cesium 公共工具函数

export async function loadCesium() {
  if (window.Cesium) return window.Cesium;

  const existingCss = document.querySelector('link[href*="cesium"]');
  if (!existingCss) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/cesium@1.141.0/Build/Cesium/Widgets/widgets.css';
    document.head.appendChild(link);
  }

  const existingJs = document.querySelector('script[src*="cesium"]');
  if (!existingJs) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/cesium@1.141.0/Build/Cesium/Cesium.js';
    document.head.appendChild(script);
    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = () => reject(new Error('Cesium JS 加载失败'));
    });
  }

  if (!window.Cesium) {
    throw new Error('Cesium 加载后 window.Cesium 不可用');
  }
  return window.Cesium;
}

export function createCesiumViewer(containerId, options = {}) {
  const Cesium = window.Cesium;
  if (!Cesium) {
    throw new Error('Cesium 未加载，请先调用 loadCesium()');
  }
  const defaultOptions = {
    animation: false,
    timeline: false,
    baseLayerPicker: true,
    geocoder: true,
    homeButton: true,
    sceneModePicker: true,
    navigationHelpButton: false,
    fullscreenButton: true,
    vrButton: false,
    ...options
  };
  return new Cesium.Viewer(containerId, defaultOptions);
}