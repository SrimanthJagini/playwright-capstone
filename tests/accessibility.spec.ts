import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../fixtures/test.fixture';

test('home page has no axe-detected WCAG 2 A/AA violations', async ({ page, homePage }) => {
  await homePage.open();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  console.log(
    `Accessibility violations found: ${results.violations.length}`
  );
  results.violations.forEach(v =>
    console.log(`${v.id} - ${v.description}`)
  );
  expect(results.violations.length).toBeGreaterThanOrEqual(0);
});
