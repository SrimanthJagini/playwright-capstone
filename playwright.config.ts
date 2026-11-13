import { defineConfig, devices } from '@playwright/test';
import { testConfig } from './config/testConfig';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: testConfig.timeout,
  expect: {
    timeout: 10_000,
  },
  outputDir: './test-results',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
  ],
  use: {
    baseURL: testConfig.baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: testConfig.navigationTimeout,
    viewport: { width: 1440, height: 900 },
  },
  projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  }
]
});
