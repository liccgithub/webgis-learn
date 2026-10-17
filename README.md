# WebGIS Learn

WebGIS 学习示例平台，包含 147+ 个示例，覆盖 Leaflet 2D 地图和 Cesium 3D 地球全栈功能。

## 项目概述

- **Leaflet** - 5 个原生 2D 地图示例（ES Module）
- **Cesium** - 5 个原生 3D 地球示例（ES Module）
- **Cesium 进阶** - 137+ 个示例，来自 [jiawanlong/Cesium-Examples](https://github.com/jiawanlong/Cesium-Examples)，涵盖：
  - 综合应用（智慧城市、台风、二三维联动等）
  - 基础功能（坐标转换、相机、事件、飞行漫游等）
  - 图层管理（影像、地形、矢量、模型）
  - 3D Tiles（加载、编辑、自定义材质）
  - 空间分析（可视域、淹没、缓冲、日照、坡度等）
  - 特效（雨雪雾、天空盒、闪电、粒子效果等）
  - 材质系统（自定义 Shader、动态材质等）
  - 可视化（风场、热力图、海流、kriging 等）
  - 物理引擎、性能优化

## 技术栈

- Vite 5.0 - 构建工具
- Leaflet 1.9.4 - 2D 地图库
- Cesium 1.141.0 - 3D 地球引擎（原生示例）
- Cesium 1.98 - 3D 地球引擎（jiawanlong 示例）
- 高德地图瓦片 - 国内免费底图服务

## 安装

```bash
npm install
```

## 设置 Cesium 进阶示例

进阶示例来自 jiawanlong/Cesium-Examples，需要单独设置：

```bash
# 1. 克隆 Cesium-Examples 到项目同级目录
cd ..
git clone https://github.com/jiawanlong/Cesium-Examples.git --depth 1

# 2. 运行设置脚本复制必要文件
cd webgis-learn
bash scripts/setup-cesium-demo.sh
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
│   └── cesium-demo/          # jiawanlong 示例（静态文件，不纳入 git）
├── src/
│   ├── main.js               # 主入口 + 路由 + 侧边栏
│   ├── style.css             # 全局样式（地形图风格设计系统）
│   ├── sourceViewer.js       # 源码展示面板（语法高亮）
│   └── examples/
│       ├── instanceManager.js # map/viewer 生命周期管理
│       ├── leaflet/           # 5 个 Leaflet 原生示例
│       └── cesium/            # 5 个 Cesium 原生示例
├── scripts/
│   └── setup-cesium-demo.sh  # 进阶示例设置脚本
├── vite.config.js
└── package.json
```

## 示例来源

- 原生示例：本项目编写，使用 ES Module 方式加载
- 进阶示例：[jiawanlong/Cesium-Examples](https://github.com/jiawanlong/Cesium-Examples)，通过 iframe 方式加载

## 更新日志

### 2026-10-11 - 分类合并 + 进阶示例源码
- 侧边栏分类合并：jiawanlong 示例 10 个分类精简为 6 个（图层+3D Tiles → 图层与模型；特效+材质+物理引擎 → 特效与材质；可视化+性能优化 → 可视化与性能）
- jiawanlong 进阶示例支持源码查看：iframe 示例页面新增源码按钮，运行时 fetch 静态 HTML 并以高亮面板展示

### 2026-10-11 - 学习体验优化
- 新增源码展示面板：右侧滑出式代码查看器，带语法高亮和复制功能
- 新增 Docs 文档页面：快速开始、Leaflet/Cesium 核心 API、学习路线、项目结构
- 重构视觉风格：地形图美学设计（Lora + Fira Sans 字体、羊皮纸/森绿/赤陶配色系统）
- 去除页面滚动条
- 集成高德地图瓦片：所有 Leaflet 示例使用高德矢量底图，Cesium 使用高德卫星底图
- 修复 Cesium 1.141 API 兼容性：imagery.js (readyPromise → async)、entities.js (Material.fromType → PolylineGlowMaterialProperty)、terrain.js (constructor → fromUrl)

### 2026-10-11 - 架构重构 + 示例集成
- 修复 Leaflet/Cesium 加载方式：改用 npm import（去掉 CDN）
- 添加 map/viewer 生命周期管理：切换示例时自动销毁，防止内存泄漏
- 修正 terrain.js：真正配置 CesiumTerrainProvider + 地形光照
- 修正 imagery.js：编程式影像源切换（OSM/Esri/CartoDB）
- 增强 camera.js：交互式相机控制 + 视角保存/恢复
- 集成 jiawanlong/Cesium-Examples 137+ 个示例
- 添加 URL hash 路由，支持书签和分享
- 删除重复的 public/index.html
- 修复 window.showContent 重复赋值
