// @ts-check
const { test, expect } = require ('@playwright/test');

test.use({
  viewport: { width: 1280, height: 720 },
});

// Basic Playwright test suite
// to run: npx playwright test

  test.beforeEach(async ({ page }) => {       
    await page.goto('https://automationpratice.com.br/');
    });

  test('login com sucesso @login', async ({ page }) => {
    
    const button = await page.getByRole('button', { name: 'Send Mail' });
    await button.scrollIntoViewIfNeeded();
    await button.click();

    await page.getByRole('link', { name: ' Login' }).click();
    await page.locator('#user').click();
    await page.locator('#user').fill('teste@gmail.com');
    await page.locator('#password').click();
    await page.locator('#password').fill('123456');
    await page.getByRole('button', { name: 'login' }).click();
    await page.getByRole('heading', { name: 'Login realizado' }).click();
    await page.locator('.swal2-success-ring').click();
    await page.getByRole('button', { name: 'OK' }).click();

    await page.pause();
    await page.close();
  });

  test('login com sucesso 2', async ({ page }) => {
    await page.getByRole('link', { name: ' Login' }).click();
    await page.locator('#user').click();
    await page.locator('#user').fill('teste@gmail.com');
    await page.locator('#password').click();
    await page.locator('#password').fill('123456');
    await page.getByRole('button', { name: 'login' }).click();
    await page.getByRole('heading', { name: 'Login realizado' }).click();
    await page.locator('.swal2-success-ring').click();
    await page.getByRole('button', { name: 'OK' }).click();

    await page.pause();
    await page.close();
  });

    test('login com sucesso 3', async ({ page }) => {
    await page.getByRole('link', { name: ' Login' }).click();
    await page.locator('#user').click();
    await page.locator('#user').fill('teste@gmail.com');
    await page.locator('#password').click();
    await page.locator('#password').fill('123456');
    await page.getByRole('button', { name: 'login' }).click();
    await page.getByRole('heading', { name: 'Login realizado' }).click();
    await page.locator('.swal2-success-ring').click();
    await page.getByRole('button', { name: 'OK' }).click();

    await page.pause();
    await page.close();
  });

  test('Adicionar no carrinho, excluir do carrinho', async ({ page }) => {
    await page.getByRole('link', { name: 'Home ' }).click();
    await page.getByRole('link', { name: 'Electronics' }).click();
    await page.getByRole('link', { name: 'Shop ' }).click();
    await page.getByRole('link', { name: 'Shop Four Grid' }).click();
    await page.getByRole('link', { name: 'Product Product' }).first().click();
    await page.getByRole('combobox').selectOption('xl');
    await page.locator('.product-color-red').click();
    await page.getByRole('link', { name: 'Add To Cart' }).click();
    await page.getByRole('heading', { name: 'Success' }).click();

    await page.getByRole('link', { name: '' }).click();
    await page.locator('#offcanvas-add-cart').getByRole('link', { name: 'Checkout' }).click();
    await page.getByRole('link', { name: '' }).click();
    await page.locator('.offcanvas-wishlist-item-delete > .offcanvas-wishlist-item-delete').first().click();
    await page.locator('#offcanvas-add-cart').getByRole('button', { name: 'icon' }).click();

});
  
test('teste butao abaixo', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Your Mail' }).click();
  await page.getByRole('heading', { name: 'NEWSLETTER' }).click();
});

test.afterEach(async ({ page }) => {
  await page.close();
});

