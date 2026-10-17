import * as Cesium from 'cesium';

const gaodeProvider = new Cesium.UrlTemplateImageryProvider({
  url: 'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
  subdomains: ['1', '2', '3', '4'],
  maximumLevel: 18,
});

export function createCesiumViewer(containerId, options = {}) {
  const defaultOptions = {
    animation: false,
    timeline: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: true,
    sceneModePicker: true,
    navigationHelpButton: false,
    fullscreenButton: false,
    vrButton: false,
    baseLayer: new Cesium.ImageryLayer(gaodeProvider),
    ...options
  };
  return new Cesium.Viewer(containerId, defaultOptions);
}
