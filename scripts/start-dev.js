const { exec, spawn } = require('child_process');
const os = require('os');

// Funkcja do sprawdzenia czy port jest zajęty
function checkPort(port) {
    return new Promise((resolve) => {
        const command = os.platform() === 'win32'
            ? `netstat -ano | findstr :${port}`
            : `lsof -ti:${port}`;

        exec(command, (error, stdout) => {
            if (error) {
                resolve(null); // Port wolny
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

// Funkcja do zabicia procesu na porcie (Windows)
function killProcessOnPort(port) {
    return new Promise((resolve) => {
        const command = `for /f "tokens=5" %a in ('netstat -aon ^| findstr :${port}') do taskkill /f /pid %a`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`❌ Nie udało się zabić procesu na porcie ${port}`);
                resolve(false);
            } else {
                console.log(`✅ Zabito proces na porcie ${port}`);
                resolve(true);
            }
        });
    });
}

// Funkcja do zabicia procesu na porcie (Linux/Mac)
function killProcessOnPortUnix(port) {
    return new Promise((resolve) => {
        exec(`lsof -ti:${port} | xargs kill -9`, (error, stdout, stderr) => {
            if (error) {
                console.log(`❌ Nie udało się zabić procesu na porcie ${port}`);
                resolve(false);
            } else {
                console.log(`✅ Zabito proces na porcie ${port}`);
                resolve(true);
            }
        });
    });
}

// Główna funkcja
async function startDev() {
    console.log('🚀 Sprawdzam port 3000...');

    const portInUse = await checkPort(3000);

    if (portInUse) {
        console.log(`⚠️  Port 3000 jest zajęty przez proces: ${portInUse}`);
        console.log('🔄 Próbuję zabić proces...');

        const killed = os.platform() === 'win32'
            ? await killProcessOnPort(3000)
            : await killProcessOnPortUnix(3000);

        if (!killed) {
            console.log('❌ Nie udało się zabić procesu. Uruchamiam na porcie 3001...');
            spawn('bun', ['run', 'dev'], {
                stdio: 'inherit',
                env: { ...process.env, PORT: '3001' }
            });
            return;
        }

        // Poczekaj chwilę i sprawdź ponownie
        console.log('⏳ Czekam 2 sekundy...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        const stillInUse = await checkPort(3000);
        if (stillInUse) {
            console.log('❌ Port nadal zajęty. Uruchamiam na porcie 3001...');
            spawn('bun', ['run', 'dev'], {
                stdio: 'inherit',
                env: { ...process.env, PORT: '3001' }
            });
            return;
        }
    }

    console.log('✅ Port 3000 jest wolny. Uruchamiam serwer...');
    spawn('bun', ['run', 'dev'], {
        stdio: 'inherit',
        env: { ...process.env, PORT: '3000' }
    });
}

// Uruchom
startDev().catch(console.error);
