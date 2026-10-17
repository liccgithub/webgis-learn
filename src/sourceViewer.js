const sourceModules = import.meta.glob('./examples/**/*.js', { query: '?raw', import: 'default', eager: true });

function escapeHtml(code) {
  return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlight(code) {
  const escaped = escapeHtml(code);

  const pattern = /(\/\/.*$|\/\*[\s\S]*?\*\/)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|\b(import|from|export|default|const|let|var|function|return|if|else|for|while|new|this|class|async|await|try|catch|throw)\b|\b(L|Cesium|document|window|console|Math|JSON|Promise|Array|Object)\b|\b(\d+\.?\d*)\b/gm;

  return escaped.replace(pattern, (match, comment, str, keyword, builtin, num) => {
    if (comment) return `<span class="hl-comment">${match}</span>`;
    if (str) return `<span class="hl-string">${match}</span>`;
    if (keyword) return `<span class="hl-keyword">${match}</span>`;
    if (builtin) return `<span class="hl-builtin">${match}</span>`;
    if (num) return `<span class="hl-number">${match}</span>`;
    return match;
  });
}

function highlightHtml(code) {
  const escaped = escapeHtml(code);

  const pattern = /(<!--[\s\S]*?-->)|(<\/?[a-zA-Z][a-zA-Z0-9-]*)|(?:('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"))|(^\s*(?:const|let|var|function|return|if|else|new)\b)/gm;

  return escaped.replace(pattern, (match, htmlComment, tag, str, jsKeyword) => {
    if (htmlComment) return `<span class="hl-comment">${match}</span>`;
    if (tag) return `<span class="hl-keyword">${match}</span>`;
    if (str) return `<span class="hl-string">${match}</span>`;
    if (jsKeyword) return match.replace(jsKeyword.trim(), `<span class="hl-keyword">${jsKeyword.trim()}</span>`);
    return match;
  });
}

let panelEl = null;

function ensurePanel() {
  if (panelEl && panelEl.isConnected) return panelEl;
  panelEl = document.createElement('div');
  panelEl.className = 'source-panel';
  panelEl.innerHTML = `
    <div class="source-panel-header">
      <span class="source-panel-title">源码</span>
      <div class="source-panel-actions">
        <button class="source-panel-copy">复制</button>
        <button class="source-panel-close">✕</button>
      </div>
    </div>
    <div class="source-panel-body"></div>
  `;
  panelEl.querySelector('.source-panel-close').addEventListener('click', () => hidePanel());
  panelEl.querySelector('.source-panel-copy').addEventListener('click', () => {
    const content = panelEl.querySelector('.source-panel-body').textContent;
    navigator.clipboard.writeText(content).then(() => {
      const btn = panelEl.querySelector('.source-panel-copy');
      btn.textContent = '已复制';
      setTimeout(() => btn.textContent = '复制', 1500);
    });
  });
  document.getElementById('main-content').appendChild(panelEl);
  return panelEl;
}

function hidePanel() {
  if (panelEl) panelEl.classList.remove('visible');
}

function renderCode(title, raw, htmlMode) {
  const panel = ensurePanel();
  const body = panel.querySelector('.source-panel-body');
  const titleEl = panel.querySelector('.source-panel-title');

  titleEl.textContent = title;

  const lines = raw.split('\n');
  const lineNums = lines.map((_, i) => `<span class="hl-line-num">${i + 1}</span>`).join('');
  const codeHtml = htmlMode ? highlightHtml(raw) : highlight(raw);
  body.innerHTML = `<pre><div class="hl-lines">${lineNums}</div><code class="hl-code">${codeHtml}</code></pre>`;

  panel.classList.add('visible');
}

function showSource(type, exampleId) {
  const path = `./examples/${type}/${exampleId}.js`;
  const raw = sourceModules[path];
  if (!raw) return;
  renderCode(`${type}/${exampleId}.js`, raw, false);
}

async function showSourceUrl(url, title) {
  const panel = document.querySelector('.source-panel');
  if (panel && panel.classList.contains('visible') && panel.querySelector('.source-panel-title').textContent === title) {
    hidePanel();
    return;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const raw = await res.text();
    renderCode(title, raw, true);
  } catch (e) {
    renderCode(title, `// 源码加载失败: ${e.message}\n// 文件: ${url}`, false);
  }
}

export { showSource, hidePanel, showSourceUrl };
