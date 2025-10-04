// Skrypt testowy dla Heritage - sprawdza przewijanie
console.log('=== HERITAGE SCROLL TEST ===');

// Funkcja do testowania przewijania
function testScroll() {
    console.log('=== TESTING SCROLL ===');

    // Sprawdź podstawowe informacje
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const currentScroll = window.scrollY;
    const maxScroll = documentHeight - windowHeight;

    console.log('Window height:', windowHeight);
    console.log('Document height:', documentHeight);
    console.log('Current scroll:', currentScroll);
    console.log('Max scroll:', maxScroll);
    console.log('Remaining scroll:', maxScroll - currentScroll);

    // Sprawdź kontener - szukaj div z ustawioną wysokością
    const container = document.querySelector('div[style*="height"]');
    if (container) {
        console.log('Container found:', container);
        console.log('Container height:', container.offsetHeight);
        console.log('Container style height:', container.style.height);
    }

    // Sprawdź czy są inne elementy wpływające na wysokość
    const allElements = document.querySelectorAll('*');
    let totalHeight = 0;
    allElements.forEach(el => {
        if (el.offsetHeight > 0) {
            totalHeight += el.offsetHeight;
        }
    });
    console.log('Total height of all elements:', totalHeight);

    // Test przewijania
    console.log('Testing scroll...');
    const originalScroll = window.scrollY;
    window.scrollBy(0, 100);

    setTimeout(() => {
        const newScroll = window.scrollY;
        console.log('Scroll test - Original:', originalScroll, 'New:', newScroll, 'Difference:', newScroll - originalScroll);

        if (newScroll - originalScroll === 100) {
            console.log('✅ Scroll works correctly');
        } else {
            console.log('❌ Scroll not working properly');
        }

        // Wróć do oryginalnej pozycji
        window.scrollTo(0, originalScroll);
    }, 100);
}

// Funkcja do wymuszenia prawidłowej wysokości
function forceCorrectHeight() {
    console.log('=== FORCING CORRECT HEIGHT ===');

    // Znajdź kontener - szukaj div z ustawioną wysokością
    const container = document.querySelector('div[style*="height"]');

    if (container) {
        const containerHeight = container.offsetHeight;
        console.log('Container height:', containerHeight);

        // Wymuś wysokość dokumentu
        document.documentElement.style.height = `${containerHeight}px`;
        document.body.style.height = `${containerHeight}px`;
        document.documentElement.style.minHeight = 'auto';
        document.body.style.minHeight = 'auto';

        console.log('Forced document height to:', containerHeight);
        console.log('New document height:', document.documentElement.scrollHeight);
    }
}

// Funkcja do testowania automatycznego przewijania
function testAutoScroll() {
    console.log('=== TESTING AUTO SCROLL ===');

    let scrollCount = 0;
    const maxScrolls = 10;

    const autoScroll = () => {
        if (scrollCount >= maxScrolls) {
            console.log('Auto scroll test completed');
            return;
        }

        const currentScroll = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        console.log(`Auto scroll ${scrollCount + 1}: Current: ${currentScroll}, Max: ${maxScroll}`);

        if (currentScroll < maxScroll - 50) {
            window.scrollBy(0, 10);
            scrollCount++;
            setTimeout(autoScroll, 100);
        } else {
            console.log('Reached end of scroll');
        }
    };

    autoScroll();
}

// Uruchom testy
console.log('Available functions:');
console.log('- testScroll() - test basic scroll functionality');
console.log('- forceCorrectHeight() - force correct document height');
console.log('- testAutoScroll() - test automatic scrolling');

// Automatycznie uruchom podstawowy test
testScroll();
