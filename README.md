# WebGIS Learn

WebGIS 学习示例项目，基于 Leaflet (2D 地图) 和 Cesium (3D 地球)。

## 项目概述

这是一个 WebGIS 学习和示例展示平台，包含：
- **Leaflet** - 2D 平面地图示例
- **Cesium** - 3D 地球可视化示例

## 功能列表

### Leaflet 示例
- 基础地图 - OpenStreetMap 底图加载
- 标记与图标 - 自定义标记、圆形标记
- 图层控制 - 多底图切换、叠加图层
- 弹窗交互 - Popup 与 Tooltip
- 矢量绘制 - 折线、多边形、矩形、圆形

### Cesium 示例
- 基础 3D 地球 - Viewer 初始化
- 实体绘制 - 点、线、面、标签
- 地形服务 - 3D 地形加载
- 影像服务 - 多影像源切换
- 相机控制 - 视角飞行控制

## 技术栈

- Vite 5.0 - 构建工具
- Leaflet 1.9.4 - 2D 地图库
- Cesium 1.141.0 - 3D 地球引擎

## 安装

```bash
npm install
```

## 启动

```bash
npm run dev
```

访问 http://localhost:5173/

## 构建

```bash
npm run build
```

## 项目结构

```
webgis-learn/
├── public/
│   └── index.html
├── src/
│   ├── main.js          # 主入口
│   ├── style.css        # 样式
│   └── examples/
│       ├── leaflet/     # 5 个示例
│       └── cesium/      # 5 个示例 + utils
├── vite.config.js
└── package.json
```

## 更新日志

### 2024-xx-xx - 项目初始化
- 创建基础项目结构
- 集成 Leaflet 和 Cesium
- 实现侧边栏导航和示例加载
- 修复多个兼容性和 UI 问题