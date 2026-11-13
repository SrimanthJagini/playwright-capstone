import type { Page, TestInfo } from '@playwright/test';

export class ScreenshotUtil {
  static async captureFailure(page: Page, testInfo: TestInfo): Promise<void> {
    const screenshotPath = testInfo.outputPath('failure.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach('failure-screenshot', {
      path: screenshotPath,
      contentType: 'image/png',
    });
  }
}
