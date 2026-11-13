import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../fixtures/test.fixture';

test('home page has no axe-detected WCAG 2 A/AA violations', async ({ page, homePage }) => {
  await homePage.open();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(
    results.violations,
    results.violations.map(({ id, impact, description }) => `${id} (${impact}): ${description}`).join('\n'),
  ).toEqual([]);
});
