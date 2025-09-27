import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Завантаження змінних з обраного .env-файлу
const envFile = process.env.ENV_FILE || '.env';
dotenv.config({ path: path.resolve(__dirname, envFile) });

console.log('[ENV] Loaded from:', envFile);
console.log('[ENV] BASE_URL:', process.env.BASE_URL);

export default defineConfig({
    testDir: './tests/HomeWork25.js',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: process.env.BASE_URL,
        httpCredentials: {
            username: process.env.HTTP_USERNAME || 'guest',
            password: process.env.HTTP_PASSWORD || 'welcome2qauto',
        },
        trace: 'on',
        video: 'on',
        screenshot: 'on',
    },
    projects: [
        {
            name: 'chrome',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});
