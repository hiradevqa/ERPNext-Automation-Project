
import { test, expect } from '../fixtures/fixtures';
import { user } from '../data/users';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Login with valid credentials', async ({ page, loginPage }) => {
  await loginPage.login(user.validUser.email, user.validUser.password);

  await page.waitForURL('/desk');
  await expect(page).toHaveURL('/desk');
});

test('Login with invalid password', async ({ loginPage }) => {
  await loginPage.login(user.invalidPassword.email, user.invalidPassword.password);

  await expect(loginPage.invalidLoginMessage).toBeVisible();
  await expect(loginPage.invalidLoginMessage).toContainText('Invalid credentials, try again.');
});

test('Login with invalid email', async ({ loginPage }) => {
  await loginPage.login(user.nonexistentUser.email, user.nonexistentUser.password);

  await expect(loginPage.invalidLoginMessage).toBeVisible();
  await expect(loginPage.invalidLoginMessage).toContainText('Invalid credentials, try again.');
});

test('Login with empty credentials', async ({ loginPage }) => {
  await loginPage.login(user.emptyCredentials.email, user.emptyCredentials.password);

  const emailError = loginPage.emailErrorMessage();
  await expect(emailError).toBeVisible();
  await expect(emailError).toHaveText('Email is required.');

  const passwordError = loginPage.passwordErrorMessage();
  await expect(passwordError).toBeVisible();
  await expect(passwordError).toHaveText('Password is required.');
});

test('Verify authenticated session survives refresh', async ({ page, loginPage }) => {
  await loginPage.login(user.validUser.email, user.validUser.password);

  await page.waitForURL('/desk');

  // Check that refreshing doesn't log the user out
  await page.reload();
  await expect(page).toHaveURL('/desk');
});

test('Logout', async ({ page, loginPage }) => {
  await loginPage.login(user.validUser.email, user.validUser.password);

  await page.waitForURL('/desk');
  await loginPage.logout();
  await expect(page).toHaveURL('/login?redirect-to=%2Fdesk');
});

test('Login again after logout', async ({ page, loginPage }) => {
  await loginPage.login(user.validUser.email, user.validUser.password);

  await page.waitForURL('/desk');
  await loginPage.logout();
  await expect(page).toHaveURL('/login?redirect-to=%2Fdesk');

  await loginPage.login(user.validUser.email, user.validUser.password);

  await page.waitForURL('/desk');
  await expect(page).toHaveURL('/desk');
});

test('Verify protected page access is blocked after logout', async ({ page, loginPage }) => {
  await loginPage.login(user.validUser.email, user.validUser.password);

  await page.waitForURL('/desk');
  await loginPage.logout();
  await expect(page).toHaveURL('/login?redirect-to=%2Fdesk');

  // A logged-out user should be redirected to login
  await page.goto('/desk');
  await expect(page).toHaveURL('/login?redirect-to=%2Fdesk');
});
