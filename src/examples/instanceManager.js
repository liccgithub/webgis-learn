let currentInstance = null;

export function registerInstance(instance) {
  destroyCurrent();
  currentInstance = instance;
}

export function destroyCurrent() {
  if (!currentInstance) return;
  if (typeof currentInstance.remove === 'function') {
    currentInstance.remove();
  } else if (typeof currentInstance.destroy === 'function') {
    currentInstance.destroy();
  }
  currentInstance = null;
}
