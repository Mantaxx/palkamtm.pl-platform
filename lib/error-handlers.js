// Skrypty do obsługi błędów zewnętrznych
export function initErrorHandlers() {
  // Natychmiastowa obsługa błędów - działa przed załadowaniem Reacta
  if (typeof window !== 'undefined') {
    initWindowErrorHandlers();
    initDocumentErrorHandlers();
    initPromiseErrorHandlers();
  }
}

function initWindowErrorHandlers() {
  // Obsługa błędów addEventListener na null
  const originalWindowAddEventListener = window.addEventListener;
  window.addEventListener = function (type, listener, options) {
    try {
      return originalWindowAddEventListener.call(this, type, listener, options);
    } catch (error) {
      if (error.message && (
        error.message.includes('addEventListener') ||
        error.message.includes('Cannot read properties of null')
      )) {
        console.warn('Ignored window addEventListener error:', error);
        return;
      }
      throw error;
    }
  };
}

function initDocumentErrorHandlers() {
  if (typeof document !== 'undefined') {
    // Obsługa błędów addEventListener na elementach
    const originalElementAddEventListener = Element.prototype.addEventListener;
    Element.prototype.addEventListener = function (type, listener, options) {
      try {
        if (this === null || this === undefined) {
          console.warn('Attempted to addEventListener on null/undefined element');
          return;
        }
        return originalElementAddEventListener.call(this, type, listener, options);
      } catch (error) {
        if (error.message && (
          error.message.includes('addEventListener') ||
          error.message.includes('Cannot read properties of null')
        )) {
          console.warn('Ignored element addEventListener error:', error);
          return;
        }
        throw error;
      }
    };

    // Obsługa błędów z querySelector
    const originalQuerySelector = document.querySelector;
    document.querySelector = function (selector) {
      try {
        return originalQuerySelector.call(this, selector);
      } catch (error) {
        console.warn('Ignored querySelector error:', error);
        return null;
      }
    };
  }
}

function initPromiseErrorHandlers() {
  // Tłumienie błędów z Promise
  window.addEventListener('unhandledrejection', function (e) {
    if (e.reason && e.reason.message && (
      e.reason.message.includes('share-modal') ||
      e.reason.message.includes('runtime.lastError') ||
      e.reason.message.includes('Could not establish connection') ||
      e.reason.message.includes('tui-image-editor')
    )) {
      e.preventDefault();
      return false;
    }
  });
}
