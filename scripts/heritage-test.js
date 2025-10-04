// Skrypt testowy dla Heritage - uruchom w konsoli przeglądarki
console.log('=== HERITAGE TEST SCRIPT ===');

// Sprawdź podstawowe informacje
function checkBasicInfo() {
    console.log('Window height:', window.innerHeight);
    console.log('Document height:', document.documentElement.scrollHeight);
    console.log('Current scroll:', window.scrollY);
    console.log('Max scroll:', document.documentElement.scrollHeight - window.innerHeight);
    
    // Sprawdź heritage achievements
    const heritageElements = document.querySelectorAll('[key]');
    console.log('Heritage elements found:', heritageElements.length);
    
    // Sprawdź kontener
    const container = document.querySelector('div[ref="containerRef"]') || 
                     document.querySelector('div[style*="height"]');
    if (container) {
        console.log('Container found:', container);
        console.log('Container height:', container.offsetHeight);
    }
}

// Test przewijania
function testScroll() {
    console.log('Testing scroll...');
    const startScroll = window.scrollY;
    window.scrollBy(0, 100);
    setTimeout(() => {
        const endScroll = window.scrollY;
        console.log('Scroll test:', startScroll, '->', endScroll);
        if (endScroll === startScroll) {
            console.log('❌ Scroll is not working!');
        } else {
            console.log('✅ Scroll is working');
        }
    }, 100);
}

// Sprawdź czy są inne elementy wpływające na scroll
function checkScrollConflicts() {
    console.log('Checking for scroll conflicts...');
    
    const spacers = document.querySelectorAll('.spacer, .heritage-spacer');
    console.log('Spacers found:', spacers.length);
    spacers.forEach((spacer, i) => {
        const el = spacer as HTMLElement;
        console.log(`Spacer ${i}:`, el.className, el.offsetHeight);
    });
    
    const elementsWithHeight = document.querySelectorAll('[style*="height"]');
    console.log('Elements with height styles:', elementsWithHeight.length);
    elementsWithHeight.forEach((el, i) => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.offsetHeight > window.innerHeight) {
            console.log(`Large element ${i}:`, el.tagName, el.className, htmlEl.offsetHeight);
        }
    });
}

// Uruchom wszystkie testy
function runAllTests() {
    checkBasicInfo();
    checkScrollConflicts();
    testScroll();
}

// Eksportuj funkcje
window.heritageTest = {
    checkBasicInfo,
    testScroll,
    checkScrollConflicts,
    runAllTests
};

console.log('Heritage test functions loaded. Use window.heritageTest.runAllTests() to start.');
