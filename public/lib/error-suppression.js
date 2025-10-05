// Error suppression script for external scripts and browser extensions
// This script suppresses common errors from browser extensions and external scripts

(function() {
  // Override console methods NATYCHMIAST
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;
  
  console.error = function(...args) {
    const message = args.join(' ');
    if (message.includes('runtime.lastError') || 
        message.includes('message port closed') ||
        message.includes('share-modal') ||
        message.includes('Could not establish connection') ||
        message.includes('Receiving end does not exist')) {
      return; // Wycisz te błędy
    }
    originalError.apply(console, args);
  };

  console.warn = function(...args) {
    const message = args.join(' ');
    if (message.includes('runtime.lastError') || 
        message.includes('message port closed')) {
      return;
    }
    originalWarn.apply(console, args);
  };

  // Globalne przechwytywanie błędów
  window.addEventListener('error', function(e) {
    if (e.message && (
      e.message.includes('addEventListener') && e.message.includes('null') ||
      e.message.includes('share-modal') ||
      e.message.includes('runtime.lastError') ||
      e.message.includes('Could not establish connection') ||
      e.message.includes('Receiving end does not exist')
    )) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }
  }, true); // Capture phase - wykonuje się przed innymi
  
  // Promise rejections
  window.addEventListener('unhandledrejection', function(e) {
    if (e.reason && (
      (e.reason.message && (
        e.reason.message.includes('runtime.lastError') ||
        e.reason.message.includes('message port closed') ||
        e.reason.message.includes('Could not establish connection') ||
        e.reason.message.includes('Receiving end does not exist')
      )) ||
      (typeof e.reason === 'string' && (
        e.reason.includes('runtime.lastError') ||
        e.reason.includes('Could not establish connection')
      ))
    )) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  // Dodatkowa ochrona - override window.onerror
  window.onerror = function(message, source, lineno, colno, error) {
    if (typeof message === 'string' && (
      message.includes('share-modal') ||
      message.includes('runtime.lastError') ||
      message.includes('Could not establish connection')
    )) {
      return true; // Zatrzymaj propagację
    }
    return false; // Pozwól na normalne błędy
  };
})();
