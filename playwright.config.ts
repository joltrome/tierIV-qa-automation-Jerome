import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Tier IV QA Automation Challenge
 *
 * This configuration demonstrates best practices for test automation including:
 * - Multi-browser testing
 * - Parallel execution
 * - Comprehensive reporting
 * - CI/CD optimization
 */

export default defineConfig({
  // Test directory
  testDir: './tests',

  // Maximum time one test can run for
  timeout: 30 * 1000,

  // Test execution settings
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI for more stable results
  workers: process.env.CI ? 1 : 3,

  // Reporter to use
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  // Shared settings for all the projects below
  use: {
    // Base URL for all tests
    baseURL: 'https://tier4.jp',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Maximum time for actions like click, fill, etc.
    actionTimeout: 10 * 1000,

    // Maximum time for navigation
    navigationTimeout: 30 * 1000,

    // Locale and timezone
    locale: 'en-US',
    timezoneId: 'Asia/Tokyo',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    // Mobile testing (can be enabled if needed)
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 13'] },
    // },
  ],

  // Run your local dev server before starting the tests (if needed)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});