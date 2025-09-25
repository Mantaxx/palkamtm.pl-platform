// Skrypty do obsługi błędów zewnętrznych
export function initErrorHandlers() {
  // Tłumienie błędów z zewnętrznych skryptów
  window.addEventListener('error', function(e) {
    if (e.filename && (
      e.filename.includes('share-modal.js') ||
      e.filename.includes('runtime.lastError') ||
      e.filename.includes('chrome-extension://') ||
      e.filename.includes('moz-extension://') ||
      e.filename.includes('tui-image-editor')
    )) {
      e.preventDefault();
      return false;
    }
  });
  
  // Obsługa błędów share-modal.js i innych zewnętrznych skryptów
  if (typeof document !== 'undefined') {
    const originalAddEventListener = document.addEventListener;
    document.addEventListener = function(type, listener, options) {
      try {
        return originalAddEventListener.call(this, type, listener, options);
      } catch (error) {
        if (error.message && error.message.includes('addEventListener')) {
          console.warn('Ignored addEventListener error:', error);
          return;
        }
        throw error;
      }
    };
    
    // Obsługa błędów z querySelector
    const originalQuerySelector = document.querySelector;
    document.querySelector = function(selector) {
      try {
        return originalQuerySelector.call(this, selector);
      } catch (error) {
        console.warn('Ignored querySelector error:', error);
        return null;
      }
    };
  }
  
  // Tłumienie błędów z Promise
  window.addEventListener('unhandledrejection', function(e) {
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
