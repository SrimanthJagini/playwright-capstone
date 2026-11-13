import { test, expect } from '../fixtures/test.fixture';
import { createTestAccount } from './support/account';

test('user registration creates an account', async ({ loginPage, homePage }) => {
  const account = createTestAccount();

  await loginPage.register(account);

  await expect(homePage.loggedInAs(account.name)).toBeVisible();
});

test('user login succeeds with a registered account', async ({ loginPage, homePage }) => {
  const account = createTestAccount();
  await loginPage.register(account);
  await loginPage.logout();
  await loginPage.login(account.email, account.password);

  await expect(homePage.loggedInAs(account.name)).toBeVisible();
});

test('user logout returns to the signed-out state', async ({ loginPage, homePage }) => {
  const account = createTestAccount();
  await loginPage.register(account);
  await loginPage.logout();

  await expect(loginPage.loginError()).toHaveCount(0);
  await expect(homePage.logoutLink()).toHaveCount(0);
});
