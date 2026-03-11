import { test, expect } from '@playwright/test';
import registerData from './data/expandtesting-register.json';

const uniqueUsername = (prefix: string) => `${prefix}-${Date.now()}`;

test.describe('ExpandTesting - Register', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(registerData.urls.register);
  });

  test('deve exibir o formulario de cadastro', async ({ page }) => {
    await expect(page).toHaveURL(registerData.urls.register);
    await expect(page.locator(registerData.selectors.registerForm)).toBeVisible();
    await expect(page.locator(registerData.selectors.username)).toBeVisible();
    await expect(page.locator(registerData.selectors.password)).toBeVisible();
    await expect(page.locator(registerData.selectors.confirmPassword)).toBeVisible();
    await expect(page.locator(registerData.selectors.submitButton)).toBeVisible();
  });

  test.skip('deve mostrar erro quando as senhas forem diferentes', async ({ page }) => {
    await page.locator(registerData.selectors.username).fill(uniqueUsername(registerData.fixtures.validUsernamePrefix));
    await page.locator(registerData.selectors.password).fill(registerData.fixtures.validPassword);
    await page.locator(registerData.selectors.confirmPassword).fill(`${registerData.fixtures.validPassword}7`);
    await page.locator(registerData.selectors.submitButton).click();

    await expect(page.getByText(registerData.messages.passwordMismatch)).toBeVisible();
  });

  test('deve mostrar erro para username muito curto', async ({ page }) => {
    await page.locator(registerData.selectors.username).fill(registerData.fixtures.shortUsername);
    await page.locator(registerData.selectors.password).fill(registerData.fixtures.validPassword);
    await page.locator(registerData.selectors.confirmPassword).fill(registerData.fixtures.validPassword);
    await page.locator(registerData.selectors.submitButton).click();

    await expect(page.getByText(registerData.messages.usernameTooShort)).toBeVisible();
  });

  test('deve registrar com sucesso com dados validos', async ({ page }) => {
    const username = uniqueUsername(registerData.fixtures.validUsernamePrefix);
    const usernameInput = page.locator(registerData.selectors.username);
    const passwordInput = page.locator(registerData.selectors.password);
    const confirmPasswordInput = page.locator(registerData.selectors.confirmPassword);
    const submitButton = page.locator(registerData.selectors.submitButton);

    await usernameInput.scrollIntoViewIfNeeded();
    await usernameInput.fill(username);

    await passwordInput.scrollIntoViewIfNeeded();
    await passwordInput.fill(registerData.fixtures.validPassword);

    await confirmPasswordInput.scrollIntoViewIfNeeded();
    await confirmPasswordInput.fill(registerData.fixtures.validPassword);

    await submitButton.scrollIntoViewIfNeeded();
    await submitButton.click();

    await expect(page).toHaveURL(registerData.urls.login);
    await expect(page.getByText(registerData.messages.registerSuccess)).toBeVisible();
  });
});
