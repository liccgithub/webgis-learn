import './style.css';
import { destroyCurrent } from './examples/instanceManager.js';
import { showSource, hidePanel, showSourceUrl } from './sourceViewer.js';

const CESIUM_DEMO_BASE = './cesium-demo/examples/cesiumEx/';

const examples = {
  leaflet: [
    { id: 'basic-map', title: '基础地图', description: '加载高德地图底图' },
    { id: 'markers', title: '标记与图标', description: '添加点和圆形标记' },
    { id: 'layers', title: '图层控制', description: '多图层叠加与切换' },
    { id: 'popup', title: '弹窗交互', description: 'Popup 与 Tooltip' },
    { id: 'vector', title: '矢量绘制', description: '绘制线、面等几何图形' },
  ],
  cesium: [
    { id: 'basic-viewer', title: '基础 3D 地球', description: '初始化 Cesium Viewer' },
    { id: 'entities', title: '实体绘制', description: '绘制点、线、面实体' },
    { id: 'terrain', title: '地形服务', description: '加载 Cesium 地形 + 光照' },
    { id: 'imagery', title: '影像服务', description: '编程式影像源切换' },
    { id: 'camera', title: '相机控制', description: '飞行、保存/恢复视角' },
  ],
};

const jiawanlongCategories = [
  {
    key: 'jwl-apps', name: '综合应用', icon: '🏙️',
    groups: [
      { name: '综合应用', items: [
        { name: '智慧城市', file: '0' },
        { name: '智慧园区', file: '000' },
        { name: '台风', file: '1' },
        { name: '下雨+闪电+洪水', file: '2' },
        { name: '二三维联动', file: '二三维联动' },
        { name: '双屏联动', file: '10.1、双屏联动' },
        { name: 'Cesium融合Three', file: 'Cesium融合Three' },
        { name: '楼栋分层', file: '楼栋分层' },
        { name: '实时在线云图', file: '实时在线云图' },
        { name: '导弹射中目标', file: '导弹射中目标' },
        { name: '视频投影示例', file: '视频投影示例' },
      ]},
    ]
  },
  {
    key: 'jwl-base', name: '基础', icon: '📐',
    groups: [
      { name: '基础功能', items: [
        { name: '默认设置', file: '1.1、默认设置' },
        { name: '颜色', file: '1.2、颜色' },
        { name: '坐标、坐标转换', file: '1.3、坐标、坐标转换' },
        { name: '屏幕/场景/地表坐标', file: '1.4、屏幕、场景、地表坐标' },
        { name: '相机', file: '1.5、相机' },
        { name: '事件', file: '1.6、事件' },
        { name: '飞行漫游', file: '1.7、飞行漫游' },
        { name: '时间运动', file: '1.8、时间运动' },
        { name: '气泡窗口', file: '1.9、气泡窗口' },
        { name: '反选遮罩', file: '1.10、反选遮罩' },
        { name: '加载shp', file: '1.11、加载shp' },
        { name: '加载mvt', file: '1.12、加载mvt' },
        { name: '罗盘、导航条', file: '1.15、罗盘、导航条' },
        { name: '绕点飞行', file: '1.16、绕点飞行' },
        { name: '深度检测', file: '1.17、深度检测' },
        { name: '任意坐标转换', file: '1.19、任意坐标转换' },
        { name: '根据点获取高度', file: '1.22、根据点获取高度' },
      ]},
    ]
  },
  {
    key: 'jwl-layers', name: '图层与模型', icon: '🗂️',
    groups: [
      { name: '影像', items: [
        { name: '单张图片', file: '2.1.0、单张图片' },
        { name: 'xyz服务', file: '2.1.2、xyz服务' },
        { name: 'tms服务', file: '2.1.3、tms服务' },
        { name: 'wms服务', file: '2.1.4、wms服务' },
        { name: 'wmts服务', file: '2.1.5、wmts服务' },
        { name: '天地图服务', file: '2.1.6、天地图服务' },
        { name: '4490服务', file: '2.1.7、4490服务' },
        { name: '影像操作', file: '2.1.9、影像操作' },
        { name: '高德、百度纠偏', file: '2.1.12、高德、百度等并纠偏' },
        { name: 'wkt', file: '2.1.13、wkt' },
        { name: '动态时序图', file: '2.1.15、动态时序图' },
        { name: 'mapbox底图', file: '2.1.16、mapbox底图' },
      ]},
      { name: '地形', items: [
        { name: '离线地形', file: '2.2.1、离线地形' },
        { name: '默认地形', file: '2.2.2、默认地形' },
        { name: '地形夸张', file: '2.2.3、地形夸张' },
      ]},
      { name: '矢量', items: [
        { name: 'entity点', file: '2.3.1、entity点' },
        { name: 'entity线', file: '2.3.2、entity线' },
        { name: 'entity面', file: '2.3.3、entity面' },
        { name: '图标', file: '2.3.4、图标' },
        { name: '海量图标', file: '2.3.5、海量图标' },
        { name: 'popup', file: '2.3.6、popup' },
        { name: 'geojson', file: '2.3.7、geojson' },
        { name: 'Primitive', file: '2.3.8、Primitive' },
        { name: 'AllPrimitive', file: '2.3.9、AllPrimitive' },
        { name: 'entityCollection', file: '2.3.10、entityCollection' },
        { name: 'entity操作', file: '2.3.11、entity操作' },
        { name: '气泡弹窗', file: '2.3.13、气泡弹窗' },
        { name: 'svg', file: '2.3.15、svg' },
        { name: 'gif', file: '2.3.16、gif' },
        { name: '聚合', file: '2.3.17、聚合' },
        { name: 'czml', file: '2.3.18、czml' },
        { name: '字体图标', file: '2.3.19、字体图标' },
        { name: '各种entity', file: '2.3.21、各种entity' },
      ]},
      { name: '模型', items: [
        { name: '加载模型', file: '2.4.1、加载模型' },
        { name: 'primitive加载模型', file: '2.4.2、primitive加载模型' },
        { name: '模型插值运动', file: '2.4.5、模型插值运动' },
        { name: '点击获取子节点', file: '2.4.6、点击获取子节点' },
        { name: '风力发电机', file: '2.4.8、风力发电机' },
      ]},
      { name: '3D Tiles', items: [
        { name: '加载模型', file: '3.1.1、加载模型' },
        { name: '模型偏移', file: '3.1.2、模型偏移' },
        { name: '模型位置编辑', file: '3.1.3、模型位置编辑' },
        { name: 'customShader自定义材质', file: '3.1.4、customShader自定义材质' },
        { name: 'customShader自定义材质2', file: '3.1.5、customShader自定义材质2' },
        { name: '点击获取属性', file: '3.1.6、点击获取属性' },
        { name: '模型压平', file: '3.1.7、模型压平' },
      ]},
    ]
  },
  {
    key: 'jwl-analysis', name: '空间分析', icon: '📊',
    groups: [
      { name: '空间分析', items: [
        { name: '地形开挖', file: '4.1.1、地形开挖' },
        { name: '可视域分析', file: '4.1.2、可视域分析' },
        { name: '淹没分析（简易）', file: '4.1.3、淹没分析（简易）' },
        { name: '淹没分析', file: '4.1.4、淹没分析' },
        { name: '缓冲分析', file: '4.1.5、缓冲分析' },
        { name: '日照分析', file: '4.1.6、日照分析' },
        { name: '方量分析', file: '4.1.7、方量分析' },
        { name: '透视分析', file: '4.1.8、透视分析' },
        { name: '剖面分析', file: '4.1.9、剖面分析' },
        { name: '单体化', file: '4.1.11、单体化' },
        { name: '坡度分析', file: '4.1.12、坡度分析' },
        { name: '坡向分析', file: '4.1.13、坡向分析' },
      ]},
      { name: '量算', items: [
        { name: '量算工具', file: '4.2.1、量算工具' },
      ]},
      { name: '视频融合', items: [
        { name: '视频纹理', file: '4.3.1、视频纹理' },
        { name: '视频投射(直播流)', file: '4.3.2、视频投射' },
      ]},
    ]
  },
  {
    key: 'jwl-effects', name: '特效与材质', icon: '✨',
    groups: [
      { name: '场景特效', items: [
        { name: '雨雪雾', file: '5.1.1、雨雪雾' },
        { name: '天空盒', file: '5.1.2、天空盒' },
        { name: '近地天空盒', file: '5.1.3、近地天空盒' },
        { name: '二三维切换', file: '5.1.5、二三维切换' },
        { name: '场景出图', file: '5.1.6、场景出图' },
        { name: '体积云', file: '5.1.7、体积云' },
        { name: '闪电', file: '5.1.8、闪电' },
        { name: '高度雾', file: '5.1.9、高度雾' },
        { name: '局部下雨', file: '5.1.11、局部下雨' },
      ]},
      { name: '特殊形状', items: [
        { name: '视锥体', file: '5.3.1、视锥体' },
        { name: '立体墙', file: '5.3.5、立体墙' },
        { name: '曲线插值', file: '5.3.6、曲线插值' },
        { name: '雷达扫描', file: '5.3.8、雷达扫描' },
        { name: '电子围栏', file: '5.3.9、电子围栏' },
        { name: '电子围栏2', file: '5.3.10、电子围栏2' },
      ]},
      { name: '粒子效果', items: [
        { name: '火焰', file: '5.4.1、火焰' },
        { name: '水枪', file: '5.4.2、水枪' },
        { name: '爆炸', file: '5.4.3、爆炸' },
        { name: '喷雾', file: '5.4.4、喷雾' },
        { name: '烟', file: '5.4.5、烟' },
      ]},
      { name: '材质', items: [
        { name: 'Material和MaterialProperty', file: '7.0.0、Material和MaterialProperty' },
        { name: 'Primitive材质', file: '7.1.0、Primitive' },
        { name: 'Entity材质', file: '7.1.0、Entity' },
        { name: '雷达', file: '7.1.1、雷达' },
        { name: '动态扩散点', file: '7.1.2、动态扩散点' },
        { name: '雷达扫描', file: '7.1.3、雷达扫描' },
        { name: '水波纹', file: '7.1.4、水波纹' },
        { name: '流动线', file: '7.1.5、流动线' },
        { name: '点光源', file: '7.1.7、点光源' },
      ]},
      { name: 'CustomShader', items: [
        { name: '简易入门', file: '7.2.1、简易入门' },
        { name: 'CustomShader_3DTiles', file: '7.2.2、CustomShader_3DTiles' },
        { name: 'CustomShader_3DTiles 动态', file: '7.2.3、CustomShader_3DTiles 动态' },
        { name: 'CustomShader_渐变', file: '7.2.4、CustomShader_渐变' },
      ]},
      { name: '物理引擎', items: [
        { name: '车辆运动', file: '6.1.1、车辆运动' },
        { name: '转动（旗子）', file: '6.1.2、转动（旗子）' },
        { name: '撞击（软体）', file: '6.1.4、撞击（软体）' },
        { name: '撞击断裂体', file: '6.1.5、撞击断裂体' },
      ]},
    ]
  },
  {
    key: 'jwl-viz', name: '可视化与性能', icon: '📈',
    groups: [
      { name: 'GIS 分析', items: [
        { name: '叠加分析', file: '8.1.1、叠加分析' },
        { name: '泰森多边形', file: '8.1.2、泰森多边形' },
        { name: '等值面', file: '8.1.5、等值面' },
        { name: '六边形网格', file: '8.1.6、六边形网格' },
      ]},
      { name: '可视化', items: [
        { name: 'kriging', file: '8.1.1、kriging' },
        { name: '海流', file: '8.1.2、海流' },
        { name: '3d热力图', file: '8.1.3、3d热力图' },
        { name: '风场', file: '8.1.4、风场' },
        { name: '蜂窝热力图', file: '8.2.6、蜂窝热力图' },
        { name: '体渲染', file: '8.2.7、体渲染' },
      ]},
      { name: '性能优化', items: [
        { name: 'Primitive', file: '9.1.1、Primitive' },
        { name: 'DrawCommand', file: '9.1.2、DrawCommand' },
      ]},
    ]
  },
];

let activeSubMenuItem = null;

function renderHeader() {
  const header = document.createElement('div');
  header.className = 'header';

  const titleDiv = document.createElement('div');
  titleDiv.className = 'header-title';
  titleDiv.innerHTML = `<span class="logo"></span><span>WebGIS Learn</span>`;

  const linksDiv = document.createElement('div');
  linksDiv.className = 'header-links';

  const homeLink = document.createElement('a');
  homeLink.href = '#/';
  homeLink.textContent = '首页';
  homeLink.addEventListener('click', (e) => { e.preventDefault(); navigate('/'); });

  const docsLink = document.createElement('a');
  docsLink.href = '#/docs';
  docsLink.textContent = '文档';
  docsLink.addEventListener('click', (e) => { e.preventDefault(); navigate('/docs'); });

  linksDiv.appendChild(homeLink);
  linksDiv.appendChild(docsLink);

  header.appendChild(titleDiv);
  header.appendChild(linksDiv);
  return header;
}

function renderSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar';

  const headerDiv = document.createElement('div');
  headerDiv.className = 'sidebar-header';
  headerDiv.innerHTML = '<h2>功能菜单</h2>';

  const menuList = document.createElement('ul');
  menuList.className = 'menu-list';

  // Original Leaflet
  addTopLevelMenu(menuList, 'Leaflet', '🗺️', examples.leaflet.map(ex => ({
    id: 'leaflet-' + ex.id, name: ex.title, type: 'leaflet', exampleId: ex.id
  })));

  // Original Cesium
  addTopLevelMenu(menuList, 'Cesium', '🌍', examples.cesium.map(ex => ({
    id: 'cesium-' + ex.id, name: ex.title, type: 'cesium', exampleId: ex.id
  })));

  // jiawanlong categories
  jiawanlongCategories.forEach(cat => {
    addJwlCategory(menuList, cat);
  });

  sidebar.appendChild(headerDiv);
  sidebar.appendChild(menuList);
  return sidebar;
}

function addTopLevelMenu(menuList, label, icon, items) {
  const menuItem = document.createElement('li');
  menuItem.className = 'menu-item';
  menuItem.dataset.menuKey = label.toLowerCase();
  menuItem.innerHTML = `<span class="menu-icon">${icon}</span><span>${label}</span>`;

  menuItem.addEventListener('click', () => {
    const subMenu = menuItem.nextElementSibling;
    if (subMenu && subMenu.classList.contains('sub-menu')) {
      subMenu.classList.toggle('active');
    }
    navigate('/' + label.toLowerCase());
  });

  menuList.appendChild(menuItem);

  const subMenu = document.createElement('ul');
  subMenu.className = 'sub-menu';

  items.forEach(item => {
    const subMenuItem = document.createElement('li');
    subMenuItem.className = 'sub-menu-item';
    subMenuItem.textContent = item.name;
    subMenuItem.dataset.exampleId = item.id;

    subMenuItem.addEventListener('click', (e) => {
      e.stopPropagation();
      setActiveSubMenuItem(subMenuItem);
      navigate('/example/' + item.type + '/' + item.exampleId);
    });

    subMenu.appendChild(subMenuItem);
  });

  menuList.appendChild(subMenu);
}

function addJwlCategory(menuList, cat) {
  const menuItem = document.createElement('li');
  menuItem.className = 'menu-item';
  menuItem.dataset.menuKey = cat.key;
  menuItem.innerHTML = `<span class="menu-icon">${cat.icon}</span><span>${cat.name}</span>`;

  const subMenu = document.createElement('ul');
  subMenu.className = 'sub-menu';

  menuItem.addEventListener('click', () => {
    subMenu.classList.toggle('active');
    navigate('/' + cat.key);
  });

  menuList.appendChild(menuItem);

  cat.groups.forEach(group => {
    if (cat.groups.length > 1) {
      const groupHeader = document.createElement('li');
      groupHeader.className = 'sub-menu-group-header';
      groupHeader.textContent = group.name;
      groupHeader.addEventListener('click', (e) => {
        e.stopPropagation();
        groupHeader.classList.toggle('open');
        const groupList = groupHeader.nextElementSibling;
        if (groupList) groupList.classList.toggle('active');
      });
      subMenu.appendChild(groupHeader);
    }

    const groupList = document.createElement('ul');
    groupList.className = 'sub-menu-group' + (cat.groups.length === 1 ? ' active flat' : '');

    group.items.forEach(item => {
      const subMenuItem = document.createElement('li');
      subMenuItem.className = 'sub-menu-item';
      subMenuItem.textContent = item.name;
      subMenuItem.dataset.jwlFile = item.file;

      subMenuItem.addEventListener('click', (e) => {
        e.stopPropagation();
        setActiveSubMenuItem(subMenuItem);
        navigate('/jwl/' + encodeURIComponent(item.file));
      });

      groupList.appendChild(subMenuItem);
    });

    subMenu.appendChild(groupList);
  });

  menuList.appendChild(subMenu);
}

function setActiveSubMenuItem(el) {
  if (activeSubMenuItem) activeSubMenuItem.classList.remove('active');
  if (el) el.classList.add('active');
  activeSubMenuItem = el;
}

function renderMainContent() {
  let mainContent = document.getElementById('main-content');
  if (!mainContent) {
    mainContent = document.createElement('div');
    mainContent.id = 'main-content';
    mainContent.className = 'main-content';
    document.getElementById('app').appendChild(mainContent);
  }
  return mainContent;
}

async function loadExample(type, exampleId) {
  destroyCurrent();
  hidePanel();

  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = `
    <div class="example-container">
      <button class="source-toggle-btn" id="source-btn">{ } 源码</button>
      <div id="map-container"></div>
    </div>
  `;

  document.getElementById('source-btn').addEventListener('click', () => {
    const panel = document.querySelector('.source-panel');
    if (panel && panel.classList.contains('visible')) {
      hidePanel();
    } else {
      showSource(type, exampleId);
    }
  });

  try {
    const module = await import(`./examples/${type}/${exampleId}.js`);
    if (module.default) {
      if (type === 'cesium') {
        await module.default();
      } else {
        module.default();
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

function loadJwlExample(fileName) {
  destroyCurrent();
  hidePanel();

  const mainContent = document.getElementById('main-content');
  const url = CESIUM_DEMO_BASE + fileName + '.html';

  mainContent.innerHTML = `
    <div class="example-container">
      <button class="source-toggle-btn" id="source-btn">{ } 源码</button>
      <iframe id="jwl-iframe" src="${url}" style="width:100%;height:100%;border:none;"></iframe>
    </div>
  `;

  document.getElementById('source-btn').addEventListener('click', () => {
    showSourceUrl(encodeURI(url), `jiawanlong/${fileName}.html`);
  });
}

function showContent(contentId) {
  destroyCurrent();
  hidePanel();
  setActiveSubMenuItem(null);

  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '';

  switch(contentId) {
    case 'home':
      renderHomeContent();
      break;
    case 'docs':
      renderDocsContent();
      break;
    default:
      if (contentId === 'Leaflet' || contentId === 'Cesium') {
        renderLayerContent(contentId);
      } else {
        const jwlCat = jiawanlongCategories.find(c => c.key === contentId);
        if (jwlCat) {
          renderJwlCategoryContent(jwlCat);
        } else {
          renderDefaultContent();
        }
      }
  }
}

function renderHomeContent() {
  const content = document.createElement('div');
  content.className = 'home-content';

  const totalExamples = examples.leaflet.length + examples.cesium.length +
    jiawanlongCategories.reduce((sum, cat) =>
      sum + cat.groups.reduce((s, g) => s + g.items.length, 0), 0);

  content.innerHTML = `
    <div class="home-hero">
      <h1>欢迎来到 WebGIS Learn</h1>
      <p>WebGIS 学习平台，包含 ${totalExamples}+ 个示例，覆盖 Leaflet 2D 地图、Cesium 3D 地球全栈功能</p>
      <p style="margin-top:8px;font-size:13px;color:#908a82;">示例来源：原生编写 + <a href="https://github.com/jiawanlong/Cesium-Examples" target="_blank" style="color:#b8563e;">jiawanlong/Cesium-Examples</a></p>
    </div>
    <div class="home-modules">
      <div class="module-card" id="card-leaflet">
        <div class="module-icon">🗺️</div>
        <h3>Leaflet</h3>
        <p>${examples.leaflet.length} 个 2D 地图示例</p>
      </div>
      <div class="module-card" id="card-cesium">
        <div class="module-icon">🌍</div>
        <h3>Cesium</h3>
        <p>${examples.cesium.length} 个 3D 地球示例</p>
      </div>
      ${jiawanlongCategories.slice(0, 4).map(cat => {
        const count = cat.groups.reduce((s, g) => s + g.items.length, 0);
        return `
          <div class="module-card" id="card-${cat.key}">
            <div class="module-icon">${cat.icon}</div>
            <h3>${cat.name}</h3>
            <p>${count} 个示例</p>
          </div>
        `;
      }).join('')}
    </div>
  `;

  document.getElementById('main-content').appendChild(content);

  document.getElementById('card-leaflet').addEventListener('click', () => navigate('/leaflet'));
  document.getElementById('card-cesium').addEventListener('click', () => navigate('/cesium'));
  jiawanlongCategories.slice(0, 4).forEach(cat => {
    const card = document.getElementById('card-' + cat.key);
    if (card) card.addEventListener('click', () => navigate('/' + cat.key));
  });
}

function renderDocsContent() {
  const content = document.createElement('div');
  content.className = 'docs-content';
  content.innerHTML = `
    <div class="docs-nav">
      <h4>目录</h4>
      <a href="javascript:void(0)" data-target="doc-quickstart">快速开始</a>
      <a href="javascript:void(0)" data-target="doc-leaflet">Leaflet 核心 API</a>
      <a href="javascript:void(0)" data-target="doc-cesium">Cesium 核心 API</a>
      <a href="javascript:void(0)" data-target="doc-roadmap">学习路线</a>
      <a href="javascript:void(0)" data-target="doc-structure">项目结构</a>
    </div>

    <div class="docs-body">
    <div class="docs-section" id="doc-quickstart">
      <h2>快速开始</h2>
      <p>WebGIS Learn 是一个基于 Vite 的 WebGIS 学习平台，集成 Leaflet 2D 地图和 Cesium 3D 地球示例。</p>

      <h3>环境要求</h3>
      <ul>
        <li>Node.js >= 18</li>
        <li>npm >= 9（或 pnpm / yarn）</li>
      </ul>

      <h3>安装与运行</h3>
      <pre><code>git clone https://github.com/liccgithub/webgis-learn.git
cd webgis-learn
npm install
npm run dev</code></pre>
      <p>启动后访问 <code>http://localhost:5173</code> 即可。</p>

      <h3>加载 jiawanlong 示例（可选）</h3>
      <p>如需运行 140+ 个 jiawanlong Cesium 示例，需执行 setup 脚本：</p>
      <pre><code>bash scripts/setup-cesium-demo.sh</code></pre>
      <p>脚本会自动从 Cesium-Examples 仓库复制所需的静态资源到 <code>public/cesium-demo/</code>。</p>
    </div>

    <div class="docs-section" id="doc-leaflet">
      <h2>Leaflet 核心 API</h2>
      <p>Leaflet 是一个轻量级的开源 JavaScript 地图库，专注于 2D 交互式地图。</p>

      <h3>1. 创建地图实例</h3>
      <pre><code>import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const map = L.map('container').setView([39.9042, 116.4074], 12);</code></pre>
      <p><code>L.map(el)</code> 绑定容器元素，<code>setView([lat, lng], zoom)</code> 设置中心和缩放级别。</p>

      <h3>2. 添加瓦片图层</h3>
      <pre><code>L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap',
  maxZoom: 19
}).addTo(map);</code></pre>
      <p>瓦片 URL 中 <code>{s}</code> 为子域名，<code>{z}/{x}/{y}</code> 为缩放和瓦片坐标。</p>

      <h3>3. 标记与图标</h3>
      <pre><code>// 默认标记
L.marker([39.9042, 116.4074]).addTo(map).bindPopup('北京');

// 圆形标记
L.circle([39.9042, 116.4074], {
  radius: 500,
  color: '#ff0000',
  fillColor: '#ff0000',
  fillOpacity: 0.3
}).addTo(map);

// 自定义图标
L.marker([39.9, 116.4], {
  icon: L.icon({
    iconUrl: 'custom.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  })
}).addTo(map);</code></pre>

      <h3>4. 图层控制</h3>
      <pre><code>const baseLayers = {
  'OSM': osmLayer,
  '卫星图': satLayer
};
const overlayLayers = {
  '标注': labelLayer,
  '路网': roadLayer
};
L.control.layers(baseLayers, overlayLayers).addTo(map);</code></pre>

      <h3>5. 矢量绘制</h3>
      <pre><code> // 折线
L.polyline([[39.9, 116.3], [39.9, 116.5]], { color: 'red', weight: 3 }).addTo(map);

// 多边形
L.polygon([
  [39.92, 116.38],
  [39.92, 116.42],
  [39.88, 116.42],
  [39.88, 116.38]
], { color: '#00f', fillOpacity: 0.2 }).addTo(map);

// 矩形
L.rectangle([[39.88, 116.38], [39.92, 116.42]]).addTo(map);</code></pre>

      <h3>6. 事件与交互</h3>
      <pre><code>map.on('click', (e) => {
  console.log('坐标:', e.latlng.lat, e.latlng.lng);
});

marker.on('mouseover', (e) => {
  e.target.openPopup();
});</code></pre>

      <h3>7. 控件配置</h3>
      <pre><code>const map = L.map('container', {
  zoomControl: false,   // 禁用默认缩放控件
  attributionControl: true,
  dragging: true,
  scrollWheelZoom: true
});

// 手动添加位置自定义的缩放控件
L.control.zoom({ position: 'bottomright' }).addTo(map);</code></pre>
    </div>

    <div class="docs-section" id="doc-cesium">
      <h2>Cesium 核心 API</h2>
      <p>Cesium 是一个开源的 JavaScript 库，用于创建精美的虚拟地球仪和二维地图，专注于 3D 地理空间可视化。</p>

      <h3>1. 创建 Viewer</h3>
      <pre><code>import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

const viewer = new Cesium.Viewer('container', {
  animation: false,
  timeline: false,
  baseLayerPicker: false,
  geocoder: false,
  homeButton: true,
  sceneModePicker: true,
  navigationHelpButton: false,
  fullscreenButton: false
});</code></pre>
      <p>构造函数第二个参数为选项对象，控制 UI 控件的显示/隐藏。线上部署时还需配置 <code>Cesium.Ion.defaultAccessToken</code>。</p>

      <h3>2. Entity 系统</h3>
      <pre><code>// 点实体
viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 1000),
  point: {
    pixelSize: 15,
    color: Cesium.Color.RED,
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2
  }
});

// 标签
viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042),
  label: {
    text: '北京',
    font: '14pt sans-serif',
    fillColor: Cesium.Color.WHITE,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM
  }
});

// 3D 模型
viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(116.4, 39.9),
  model: {
    uri: 'path/to/model.glb',
    scale: 1.0,
    minimumPixelSize: 64
  }
});</code></pre>

      <h3>3. 相机控制</h3>
      <pre><code>// 飞行到指定位置
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 10000),
  orientation: {
    heading: Cesium.Math.toRadians(0),
    pitch: Cesium.Math.toRadians(-45),
    roll: 0
  },
  duration: 3  // 飞行时间（秒）
});

// 立即跳转
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(120.0, 30.0, 5000)
});

// 获取当前相机参数
const pose = viewer.camera.positionWC;
const heading = viewer.camera.headingWC;
const pitch = viewer.camera.pitchWC;</code></pre>

      <h3>4. 地形与影像</h3>
      <pre><code>// 加载地形
const terrain = await Cesium.CesiumTerrainProvider.fromIon(1);
viewer.scene.terrainProvider = terrain;
viewer.scene.setTerrain({ terrain, credit: '...' });

// 自定义影像源
viewer.imageryLayers.addImageryProvider(
  new Cesium.UrlTemplateImageryProvider({
    url: 'https://server/{z}/{x}/{y}.png'
  })
);

// 切换为无地形（椭球体）
viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider();</code></pre>

      <h3>5. Primitive vs Entity</h3>
      <p>Cesium 提供两种渲染路径：</p>
      <ul>
        <li><strong>Entity API</strong> — 声明式，自动处理动画和属性变化，适合少量对象</li>
        <li><strong>Primitive API</strong> — 命令式，直接操作 GPU Buffer，适合海量静态对象</li>
      </ul>
      <pre><code>// Primitive 示例：批量绘制点
const points = new Cesium.PointPrimitiveCollection();
for (let i = 0; i < 10000; i++) {
  points.add({
    position: Cesium.Cartesian3.fromDegrees(
      116 + Math.random(), 39 + Math.random()
    ),
    color: Cesium.Color.fromRandom({ alpha: 0.6 }),
    pixelSize: 4
  });
}
viewer.scene.primitives.add(points);</code></pre>

      <h3>6. 坐标系统</h3>
      <pre><code>// 经纬度 → 世界坐标
const cartesian = Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 100);

// 世界坐标 → 经纬度
const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
const lon = Cesium.Math.toDegrees(cartographic.longitude);
const lat = Cesium.Math.toDegrees(cartographic.latitude);
const height = cartographic.height;

// 屏幕坐标 → 世界坐标
const ray = viewer.camera.getPickRay(window.mousePosition);
const position = viewer.scene.globe.pick(ray, viewer.scene);</code></pre>
    </div>

    <div class="docs-section" id="doc-roadmap">
      <h2>学习路线</h2>
      <p>推荐以下顺序逐步掌握 WebGIS 开发：</p>

      <h3>第一阶段：2D 地图基础</h3>
      <ul>
        <li>Leaflet 基础地图 → 标记与图标 → 图层控制 → 弹窗交互 → 矢量绘制</li>
        <li>掌握瓦片图层、GeoJSON 渲染、控件体系</li>
      </ul>

      <h3>第二阶段：3D 地球入门</h3>
      <ul>
        <li>Cesium Viewer 初始化 → Entity 绘制 → 相机控制</li>
        <li>理解笛卡尔坐标、视角参数 (heading/pitch/roll)</li>
      </ul>

      <h3>第三阶段：数据加载与服务</h3>
      <ul>
        <li>影像服务：XYZ / WMS / WMTS / 天地图</li>
        <li>地形服务：Cesium World Terrain、自定义地形</li>
        <li>矢量数据：GeoJSON、shp、3D Tiles、glTF</li>
      </ul>

      <h3>第四阶段：进阶专题</h3>
      <ul>
        <li>空间分析：可视域、填挖方、剖面、缓冲</li>
        <li>特效与材质：CustomShader、粒子系统、视锥体</li>
        <li>性能优化：Primitive 批渲染、DrawCommand、LOD</li>
        <li>数据可视化：风场、热力图、克里金插值</li>
      </ul>

      <h3>第五阶段：综合应用</h3>
      <ul>
        <li>二三维联动</li>
        <li>智慧城市大屏</li>
        <li>低空经济 / 智慧交通场景</li>
      </ul>
    </div>

    <div class="docs-section" id="doc-structure">
      <h2>项目结构</h2>
      <pre><code>webgis-learn/
├── index.html              # Vite 入口
├── vite.config.js          # Vite + cesium 插件配置
├── package.json
├── scripts/
│   └── setup-cesium-demo.sh  # jiawanlong 资源复制脚本
├── public/
│   └── cesium-demo/          # jiawanlong 静态资源 (gitignored)
└── src/
    ├── main.js             # 路由、菜单、页面渲染
    ├── style.css           # 全局样式
    ├── sourceViewer.js     # 源码展示面板组件
    └── examples/
        ├── instanceManager.js  # 地图实例生命周期管理
        ├── leaflet/            # Leaflet 原生示例
        │   ├── basic-map.js
        │   ├── markers.js
        │   ├── layers.js
        │   ├── popup.js
        │   └── vector.js
        └── cesium/             # Cesium 原生示例
            ├── cesiumViewer.js
            ├── utils.js
            ├── basic-viewer.js
            ├── entities.js
            ├── terrain.js
            ├── imagery.js
            └── camera.js</code></pre>

      <h3>核心机制</h3>
      <p><strong>路由</strong>：基于 URL hash 的 SPA 路由。<code>#/example/leaflet/basic-map</code> 加载原生示例，<code>#/jwl/{fileName}</code> 通过 iframe 加载 jiawanlong 示例。</p>
      <p><strong>实例管理</strong>：<code>instanceManager.js</code> 统一跟踪当前地图/Viewer 实例，页面切换时自动调用 <code>destroy()</code> 或 <code>remove()</code> 释放资源。</p>
      <p><strong>示例加载</strong>：原生示例通过 <code>import.meta.glob</code> + 动态 <code>import()</code> 实现按需加载，每个示例 export 一个 default 函数。</p>
      <p><strong>源码展示</strong>：Vite 的 <code>?raw</code> 查询将示例源文件作为字符串导入，由 <code>sourceViewer.js</code> 渲染为带语法高亮的代码面板。</p>
    </div>
    </div>
  `;
  document.getElementById('main-content').appendChild(content);

  const navLinks = content.querySelectorAll('.docs-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const sections = [...content.querySelectorAll('.docs-section')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.target === entry.target.id));
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  sections.forEach(s => observer.observe(s));
}

function renderLayerContent(layerType) {
  const content = document.createElement('div');
  content.className = 'function-card';

  const title = layerType + ' 示例';
  const items = examples[layerType.toLowerCase()];
  const type = layerType.toLowerCase();

  content.innerHTML = `
    <div class="function-card-header">
      <div class="function-card-title">${title}</div>
    </div>
    <div class="function-card-body">
      <div class="function-cards">
        ${items.map(item => `
          <div class="function-card-item" data-example-id="${item.id}">
            <div class="function-card-desc"><strong>${item.title}</strong>: ${item.description}</div>
            <button class="function-card-btn">查看示例</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.getElementById('main-content').appendChild(content);

  content.querySelectorAll('.function-card-item').forEach(el => {
    el.addEventListener('click', () => {
      navigate('/example/' + type + '/' + el.dataset.exampleId);
    });
  });
}

function renderJwlCategoryContent(cat) {
  const mainContent = document.getElementById('main-content');
  const allItems = cat.groups.flatMap(g => g.items);

  const content = document.createElement('div');
  content.className = 'function-card';
  content.innerHTML = `
    <div class="function-card-header">
      <div class="function-card-title">${cat.icon} ${cat.name}</div>
    </div>
    <div class="function-card-body">
      ${cat.groups.map(group => `
        ${cat.groups.length > 1 ? `<h3 style="margin:15px 0 8px;color:#4a4540;font-size:15px;font-family:var(--font-display);">${group.name}</h3>` : ''}
        <div class="function-cards">
          ${group.items.map(item => `
            <div class="function-card-item" data-jwl-file="${item.file}">
              <div class="function-card-desc"><strong>${item.name}</strong></div>
              <button class="function-card-btn">查看示例</button>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;

  mainContent.appendChild(content);

  content.querySelectorAll('.function-card-item').forEach(el => {
    el.addEventListener('click', () => {
      navigate('/jwl/' + encodeURIComponent(el.dataset.jwlFile));
    });
  });
}

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

function navigate(path) {
  window.location.hash = path;
}

function handleRoute() {
  const hash = window.location.hash.replace('#', '') || '/';
  const parts = hash.split('/').filter(Boolean);

  if (parts.length === 0) {
    showContent('home');
    return;
  }

  if (parts[0] === 'docs') {
    showContent('docs');
    return;
  }

  if (parts[0] === 'jwl' && parts.length >= 2) {
    const fileName = decodeURIComponent(parts.slice(1).join('/'));
    loadJwlExample(fileName);
    return;
  }

  if (parts[0] === 'leaflet' || parts[0] === 'cesium') {
    if (parts.length === 1) {
      showContent(parts[0].charAt(0).toUpperCase() + parts[0].slice(1));
      expandSubMenu(parts[0]);
      return;
    }
  }

  if (parts[0] === 'example' && parts.length >= 3) {
    const type = parts[1];
    const exampleId = parts.slice(2).join('/');
    expandSubMenu(type);
    highlightSubMenuItem(type + '-' + exampleId);
    loadExample(type, exampleId);
    return;
  }

  // Check if it's a jiawanlong category
  const jwlCat = jiawanlongCategories.find(c => c.key === parts[0]);
  if (jwlCat) {
    showContent(jwlCat.key);
    expandSubMenu(jwlCat.key);
    return;
  }

  showContent('home');
}

function expandSubMenu(key) {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  const menuItems = sidebar.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    if (item.dataset.menuKey === key) {
      const subMenu = item.nextElementSibling;
      if (subMenu && !subMenu.classList.contains('active')) {
        subMenu.classList.add('active');
      }
    }
  });
}

function highlightSubMenuItem(exampleId) {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  const items = sidebar.querySelectorAll('.sub-menu-item');
  items.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.exampleId === exampleId) {
      item.classList.add('active');
      setActiveSubMenuItem(item);
    }
  });
}

function init() {
  const app = document.getElementById('app');
  app.appendChild(renderHeader());
  app.appendChild(renderSidebar());
  renderMainContent();

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

init();
