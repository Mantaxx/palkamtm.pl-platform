// Sprawdzenie obrotów w animacjach
console.log('🔍 Sprawdzanie obrotów');

const cells = document.querySelectorAll('.heritage-cell');
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        console.log(`\n=== KARTA ${index} ===`);

        // Monitoruj transform co 200ms
        let count = 0;
        const monitor = setInterval(() => {
            const transform = window.getComputedStyle(cell).transform;
            const animation = window.getComputedStyle(cell).animationName;

            console.log(`${count * 200}ms:`, {
                animation,
                transform: transform.substring(0, 80) + '...'
            });

            count++;
            if (count > 15) clearInterval(monitor);
        }, 200);
    });
});
