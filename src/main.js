import './style.css';

// 示例列表配置
const examples = {
  leaflet: [
    { id: 'basic-map', title: '基础地图', description: '加载 OpenStreetMap 底图' },
    { id: 'markers', title: '标记与图标', description: '添加点和圆形标记' },
    { id: 'layers', title: '图层控制', description: '多图层叠加与切换' },
    { id: 'popup', title: '弹窗交互', description: 'Popup 与 Tooltip' },
    { id: 'vector', title: '矢量绘制', description: '绘制线、面等几何图形' },
  ],
  cesium: [
    { id: 'basic-viewer', title: '基础 3D 地球', description: '初始化 Cesium Viewer' },
    { id: 'entities', title: '实体绘制', description: '绘制点、线、面实体' },
    { id: 'terrain', title: '地形服务', description: '加载 Cesium 地形' },
    { id: 'imagery', title: '影像服务', description: '加载不同影像源' },
    { id: 'camera', title: '相机控制', description: '相机飞行与视角控制' },
  ],
};

// 菜单数据
const menuData = {
  'Leaflet': {
    icon: '🗺️',
    items: [
      { id: 'leaflet-basic-map', name: '基础地图', description: '加载 OpenStreetMap 底图', type: 'leaflet' },
      { id: 'leaflet-markers', name: '标记与图标', description: '添加点和圆形标记', type: 'leaflet' },
      { id: 'leaflet-layers', name: '图层控制', description: '多图层叠加与切换', type: 'leaflet' },
      { id: 'leaflet-popup', name: '弹窗交互', description: 'Popup 与 Tooltip', type: 'leaflet' },
      { id: 'leaflet-vector', name: '矢量绘制', description: '绘制线、面等几何图形', type: 'leaflet' },
    ]
  },
  'Cesium': {
    icon: '🌍',
    items: [
      { id: 'cesium-basic-viewer', name: '基础 3D 地球', description: '初始化 Cesium Viewer', type: 'cesium' },
      { id: 'cesium-entities', name: '实体绘制', description: '绘制点、线、面实体', type: 'cesium' },
      { id: 'cesium-terrain', name: '地形服务', description: '加载 Cesium 地形', type: 'cesium' },
      { id: 'cesium-imagery', name: '影像服务', description: '加载不同影像源', type: 'cesium' },
      { id: 'cesium-camera', name: '相机控制', description: '相机飞行与视角控制', type: 'cesium' },
    ]
  }
};

// 顶部导航
function renderHeader() {
  const header = document.createElement('div');
  header.className = 'header';

  // 项目名称
  const titleDiv = document.createElement('div');
  titleDiv.className = 'header-title';
  titleDiv.innerHTML = `
    <span class="logo"></span>
    <span>WebGIS Learn</span>
  `;

  // 右侧链接
  const linksDiv = document.createElement('div');
  linksDiv.className = 'header-links';
  linksDiv.innerHTML = `
    <a href="#" onclick="showContent('home')">首页</a>
    <a href="#" onclick="showContent('docs')">文档</a>
    <a href="#" onclick="showContent('components')">组件</a>
  `;

  header.appendChild(titleDiv);
  header.appendChild(linksDiv);

  return header;
}

// 左侧侧边栏
function renderSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar';

  // 侧边栏标题
  const headerDiv = document.createElement('div');
  headerDiv.className = 'sidebar-header';
  headerDiv.innerHTML = '<h2>功能菜单</h2>';

  // 菜单项
  const menuList = document.createElement('ul');
  menuList.className = 'menu-list';

  // 添加菜单项
  Object.entries(menuData).forEach(([key, value]) => {
    const menuItem = document.createElement('li');
    menuItem.className = 'menu-item';
    menuItem.innerHTML = `
      <span class="menu-icon">${value.icon}</span>
      <span>${key}</span>
    `;

    // 点击菜单项
    menuItem.addEventListener('click', () => {
      // 切换子菜单
      const subMenu = menuItem.nextElementSibling;
      if (subMenu) {
        subMenu.classList.toggle('active');
      }

      // 显示对应内容
      showContent(key);
    });

    menuList.appendChild(menuItem);

    // 添加子菜单
    if (value.items) {
      const subMenu = document.createElement('ul');
      subMenu.className = 'sub-menu';

      value.items.forEach(item => {
        const subMenuItem = document.createElement('li');
        subMenuItem.className = 'sub-menu-item';
        subMenuItem.textContent = item.name;

        // 点击子菜单项加载示例
        subMenuItem.addEventListener('click', (e) => {
          e.stopPropagation();
          loadExample(item.type, item.id);
        });

        subMenu.appendChild(subMenuItem);
      });

      menuList.appendChild(subMenu);
    }
  });

  sidebar.appendChild(headerDiv);
  sidebar.appendChild(menuList);

  return sidebar;
}

// 主内容区域
function renderMainContent() {
  let mainContent = document.getElementById('main-content');
  if (!mainContent) {
    mainContent = document.createElement('div');
    mainContent.id = 'main-content';
    mainContent.className = 'main-content';
    document.getElementById('app').appendChild(mainContent);
  }

  // 默认显示首页
  showContent('home');

  return mainContent;
}

// 加载示例
async function loadExample(type, id) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '<div id="example-container" class="example-container"><button class="back-button" onclick="showContent(\'home\')">← 返回首页</button><div id="map-container"></div></div>';

  try {
    if (type === 'leaflet') {
      const module = await import(`./examples/leaflet/${id.replace('leaflet-', '')}.js`);
      if (module.default) {
        module.default();
      }
    } else if (type === 'cesium') {
      const module = await import(`./examples/cesium/${id.replace('cesium-', '')}.js`);
      if (module.default) {
        await module.default();
      }
    }
  } catch (error) {
    console.error('加载示例失败:', error);
    document.getElementById('map-container').innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h3>加载示例失败</h3>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// 全局暴露函数供 onclick 使用
window.loadExample = loadExample;
window.showContent = showContent;
window.showContent = showContent;
window.showContent = showContent;
window.showContent = showContent;

// 显示内容
function showContent(contentId) {
  const mainContent = document.getElementById('main-content');

  // 清空当前内容
  mainContent.innerHTML = '';

  // 根据内容ID显示不同内容
  switch(contentId) {
    case 'home':
      renderHomeContent();
      break;
    case 'docs':
      renderDocsContent();
      break;
    case 'components':
      renderComponentsContent();
      break;
    default:
      // 默认显示图层相关内容
      if (contentId in menuData) {
        renderLayerContent(contentId);
      } else {
        renderDefaultContent();
      }
  }
}

// 首页内容
function renderHomeContent() {
  const content = document.createElement('div');
  content.className = 'home-content';

  content.innerHTML = `
    <div class="home-hero">
      <h1>欢迎来到 WebGIS Learn</h1>
      <p>WebGIS 学习平台，包含 Leaflet 2D 地图和 Cesium 3D 地球的各种示例</p>
    </div>
    <div class="home-modules">
      <div class="module-card" onclick="loadExample('leaflet', 'leaflet-basic-map')">
        <div class="module-icon">🗺️</div>
        <h3>Leaflet</h3>
        <p>2D 地图示例</p>
      </div>
      <div class="module-card" onclick="loadExample('cesium', 'cesium-basic-viewer')">
        <div class="module-icon">🌍</div>
        <h3>Cesium</h3>
        <p>3D 地球示例</p>
      </div>
    </div>
  `;

  document.getElementById('main-content').appendChild(content);
}

// 文档内容
function renderDocsContent() {
  const content = document.createElement('div');
  content.className = 'function-card';

  content.innerHTML = `
    <div class="function-card-header">
      <div class="function-card-title">文档中心</div>
    </div>
    <div class="function-card-body">
      <p>这里将展示所有文档内容...</p>
    </div>
  `;

  document.getElementById('main-content').appendChild(content);
}

// 组件内容
function renderComponentsContent() {
  const content = document.createElement('div');
  content.className = 'function-card';

  content.innerHTML = `
    <div class="function-card-header">
      <div class="function-card-title">组件库</div>
    </div>
    <div class="function-card-body">
      <p>这里将展示所有可用组件...</p>
    </div>
  `;

  document.getElementById('main-content').appendChild(content);
}

// 图层内容
function renderLayerContent(layerType) {
  const content = document.createElement('div');
  content.className = 'function-card';

  // 根据图层类型显示不同内容
  let title, items;
  const svgData = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="300" height="200" fill="#1a1f35"/><text x="150" y="100" text-anchor="middle" fill="#00d9ff" font-size="18" font-family="sans-serif">WebGIS</text></svg>');

  if (layerType === 'Leaflet') {
    title = 'Leaflet 示例';
    items = examples.leaflet;
  } else if (layerType === 'Cesium') {
    title = 'Cesium 示例';
    items = examples.cesium;
  } else {
    title = '图层';
    items = [
      { id: 'leaflet-basic-map', name: '基础地图', desc: '加载 OpenStreetMap 底图', type: 'leaflet' },
      { id: 'leaflet-markers', name: '标记与图标', desc: '添加点和圆形标记', type: 'leaflet' },
    ];
  }

  content.innerHTML = `
    <div class="function-card-header">
      <div class="function-card-title">${title}</div>
    </div>
    <div class="function-card-body">
      <div class="function-cards">
        ${items.map(item => `
          <div class="function-card-item">
            <img src="${svgData}" alt="${item.name || item.title}" class="function-card-img">
            <div class="function-card-desc">${item.name || item.title}: ${item.desc || item.description}</div>
            <button class="function-card-btn" onclick="loadExample('${item.type || layerType.toLowerCase()}', '${item.id}')">查看示例</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.getElementById('main-content').appendChild(content);
}

// 默认内容
function renderDefaultContent() {
  const content = document.createElement('div');
  content.className = 'function-card';

  content.innerHTML = `
    <div class="function-card-header">
      <div class="function-card-title">功能选择</div>
    </div>
    <div class="function-card-body">
      <p>请从左侧菜单选择一个功能模块。</p>
    </div>
  `;

  document.getElementById('main-content').appendChild(content);
}

// 初始化页面
function init() {
  const app = document.getElementById('app');

  // 创建头部
  const header = renderHeader();
  app.appendChild(header);

  // 创建侧边栏
  const sidebar = renderSidebar();
  app.appendChild(sidebar);

  // 创建主内容区域
  const mainContent = renderMainContent();
  app.appendChild(mainContent);

  // 添加响应式事件
  document.addEventListener('DOMContentLoaded', () => {
    // 侧边栏切换
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    // 点击侧边栏外的区域关闭
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !e.target.matches('.sidebar-header')) {
        sidebar.classList.remove('active');
      }
    });

    // 点击侧边栏标题展开/收起
    const sidebarHeader = document.querySelector('.sidebar-header');
    sidebarHeader.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  });
}

// 初始化
init();