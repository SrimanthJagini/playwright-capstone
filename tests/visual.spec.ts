import { test, expect } from '../fixtures/test.fixture';

test('home page header matches its visual baseline', async ({ page, homePage }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'Visual baselines are maintained on Chromium.');
  await homePage.open();
  await expect(page.locator('#header')).toHaveScreenshot('home-header.png', {
    animations: 'disabled',
    maxDiffPixelRatio: 0.02,
  });
});
