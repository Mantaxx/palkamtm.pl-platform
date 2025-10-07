import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        setupFiles: ['./__tests__/setup.ts'],
        include: ['__tests__/**/*.test.ts', '__tests__/**/*.test.tsx'],
        exclude: ['node_modules', '.next', 'dist'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                '__tests__/',
                '.next/',
                'dist/',
                '**/*.d.ts',
                '**/*.config.*',
                '**/coverage/**',
                '**/public/**',
                '**/prisma/**',
                '**/scripts/**'
            ],
            thresholds: {
                global: {
                    branches: 70,
                    functions: 70,
                    lines: 70,
                    statements: 70
                }
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './'),
        },
    },
})
