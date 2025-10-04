// Skrypt diagnostyczny dla HeritageFlyingPages
// Analizuje problemy z automatycznym przewijaniem

console.log('=== HERITAGE DEBUG SCRIPT ===');

// Funkcja do analizy stanu przewijania
function analyzeScrollState() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const currentScroll = window.scrollY;
    const maxScroll = documentHeight - windowHeight;

    console.log('=== SCROLL ANALYSIS ===');
    console.log('Window Height:', windowHeight);
    console.log('Document Height:', documentHeight);
    console.log('Current Scroll:', currentScroll);
    console.log('Max Scroll:', maxScroll);
    console.log('Remaining Scroll:', maxScroll - currentScroll);
    console.log('Scroll Percentage:', ((currentScroll / maxScroll) * 100).toFixed(2) + '%');

    // Sprawdź kontener
    const container = document.querySelector('[ref="containerRef"]') ||
        document.querySelector('.heritage-container') ||
        document.querySelector('div[style*="height"]');

    if (container) {
        console.log('Container found:', container);
        console.log('Container height:', container.offsetHeight);
        console.log('Container style height:', container.style.height);
    } else {
        console.log('Container NOT found!');
    }

    // Sprawdź wszystkie elementy z wysokością
    const elementsWithHeight = document.querySelectorAll('[style*="height"]');
    console.log('Elements with height styles:', elementsWithHeight.length);
    elementsWithHeight.forEach((el, i) => {
        console.log(`Element ${i}:`, el.tagName, el.className, el.style.height);
    });

    // Sprawdź heritage achievements
    const heritageElements = document.querySelectorAll('[key]');
    console.log('Heritage elements found:', heritageElements.length);

    return {
        windowHeight,
        documentHeight,
        currentScroll,
        maxScroll,
        remainingScroll: maxScroll - currentScroll,
        scrollPercentage: (currentScroll / maxScroll) * 100
    };
}

// Funkcja do monitorowania zmian w DOM
function monitorDOMChanges() {
    console.log('=== MONITORING DOM CHANGES ===');

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' &&
                (mutation.attributeName === 'style' || mutation.attributeName === 'height')) {
                console.log('Style change detected:', mutation.target);
            }
        });
    });

    observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['style', 'height']
    });

    return observer;
}

// Funkcja do testowania przewijania
function testScrolling() {
    console.log('=== TESTING SCROLLING ===');

    const originalScrollBy = window.scrollBy;
    let scrollCallCount = 0;

    // Przechwytuj wywołania scrollBy
    window.scrollBy = function (...args) {
        scrollCallCount++;
        console.log(`ScrollBy call #${scrollCallCount}:`, args);
        console.log('Before scroll - Current position:', window.scrollY);

        const result = originalScrollBy.apply(this, args);

        console.log('After scroll - Current position:', window.scrollY);
        console.log('Max scroll:', document.documentElement.scrollHeight - window.innerHeight);

        return result;
    };

    return () => {
        window.scrollBy = originalScrollBy;
        console.log('Total scrollBy calls:', scrollCallCount);
    };
}

// Funkcja do sprawdzenia animacji requestAnimationFrame
function monitorAnimationFrames() {
    console.log('=== MONITORING ANIMATION FRAMES ===');

    const originalRAF = window.requestAnimationFrame;
    let rafCallCount = 0;

    window.requestAnimationFrame = function (callback) {
        rafCallCount++;
        console.log(`RAF call #${rafCallCount}`);

        return originalRAF.call(this, (...args) => {
            console.log(`RAF execution #${rafCallCount}`);
            return callback.apply(this, args);
        });
    };

    return () => {
        window.requestAnimationFrame = originalRAF;
        console.log('Total RAF calls:', rafCallCount);
    };
}

// Główna funkcja diagnostyczna
function runDiagnostics() {
    console.log('Starting Heritage diagnostics...');

    // Analiza początkowa
    const initialState = analyzeScrollState();

    // Monitorowanie zmian DOM
    const domObserver = monitorDOMChanges();

    // Testowanie przewijania
    const scrollRestore = testScrolling();

    // Monitorowanie animacji
    const rafRestore = monitorAnimationFrames();

    // Sprawdź co 5 sekund
    const interval = setInterval(() => {
        console.log('=== PERIODIC CHECK ===');
        const currentState = analyzeScrollState();

        if (currentState.currentScroll === initialState.currentScroll) {
            console.log('⚠️  WARNING: Scroll position has not changed!');
        }

        if (currentState.documentHeight !== initialState.documentHeight) {
            console.log('📏 Document height changed:',
                initialState.documentHeight, '->', currentState.documentHeight);
        }
    }, 5000);

    // Cleanup po 60 sekundach
    setTimeout(() => {
        console.log('=== CLEANING UP DIAGNOSTICS ===');
        clearInterval(interval);
        domObserver.disconnect();
        scrollRestore();
        rafRestore();
        console.log('Diagnostics completed.');
    }, 60000);

    return {
        stop: () => {
            clearInterval(interval);
            domObserver.disconnect();
            scrollRestore();
            rafRestore();
        }
    };
}

// Eksportuj funkcje do globalnego scope
window.heritageDebug = {
    analyzeScrollState,
    runDiagnostics,
    testScrolling,
    monitorDOMChanges,
    monitorAnimationFrames
};

console.log('Heritage debug functions loaded. Use window.heritageDebug.runDiagnostics() to start.');
