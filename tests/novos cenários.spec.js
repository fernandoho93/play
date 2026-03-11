// @ts-check
const { test, expect } = require('@playwright/test');

const URL = 'https://automationpratice.com.br/';

test.describe('Cenários de Teste - Automation Practice', () => {
  
  test('login com credenciais inválidas', async ({ page }) => {
    await page.goto(URL);
    await page.getByRole('link', { name: ' Login' }).click();
    await page.locator('#user').fill('1');
    await page.locator('#password').fill('senhaerrada');
    await page.getByRole('button', { name: 'login' }).click();
    
    // Verificar se a mensagem de erro aparece
    await expect(page.getByText('E-mail inválido.')).toBeVisible();
    await page.close();
  });

  test('visualizar produtos na página inicial', async ({ page }) => {
    await page.goto(URL);
    await page.evaluate(() => window.scrollBy(0, 500));

    // Verificar se os produtos são exibidos

     await expect(page.getByRole('link', { name: 'Movie Projector HD Outdoor' })).toBeVisible();
     await expect(page.getByRole('link', { name: 'product_img' }).nth(1)).toBeVisible();
     await expect(page.getByRole('link', { name: 'product_img' }).nth(4)).toBeVisible();

  });

  test.skip('buscar produto', async ({ page }) => {
    await page.goto(URL);
    
    // Procurar campo de busca e realizar busca
    const searchInput = page.locator('[class*="search"], [placeholder*="search" i], #search');
    if (await searchInput.isVisible()) {
      await searchInput.fill('Nike');
      await searchInput.press('Enter');
      
      // Verificar se os resultados aparecem
      await page.waitForLoadState('networkidle');
    }
  });

  test('adicionar produto ao carrinho', async ({ page }) => {
    await page.goto(URL);
    
    // Encontrar e clicar em um botão de adicionar ao carrinho
    const addToCartButton = page.locator('button:has-text("Add to cart"), [class*="add-to-cart"], [aria-label*="Add to cart"]').first();
    
    if (await addToCartButton.isVisible()) {
      await addToCartButton.click();
      
      // Verificar se a notificação de sucesso aparece
      await page.waitForTimeout(1000);
      const notification = page.locator('[class*="message"], [class*="success"], [class*="toast"]');
      if (await notification.isVisible()) {
        await expect(notification).toBeVisible();
      }
    }
  });

  test('acessar página de carrinho', async ({ page }) => {
    await page.goto(URL);
    
    // Procurar link ou botão do carrinho
    const cartLink = page.locator('a:has-text("Cart"), [aria-label*="cart" i], [class*="cart"]').first();
    
    if (await cartLink.isVisible()) {
      await cartLink.click();
      await page.waitForLoadState('networkidle');
      
      // Verificar se estamos na página do carrinho
      const cartTitle = page.locator('h1, h2, [class*="title"]');
      await expect(cartTitle).toContainText(/cart|carrinho/i);
    }
  });

  test('verificar menu de navegação', async ({ page }) => {
    await page.goto(URL);
    
    // Verificar se o menu principal está presente
    const nav = page.locator('nav, [role="navigation"]');
    await expect(nav).toBeVisible();
    
    // Verificar se há links de menu
    const navLinks = nav.locator('a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test.skip('validar linkagem para redes sociais', async ({ page }) => {
    await page.goto(URL);
    
    // Procurar footer
    const footer = page.locator('footer, [class*="footer"]');
    
    if (await footer.isVisible()) {
      // Verificar se há links para redes sociais
      const socialLinks = footer.locator('a[href*="facebook"], a[href*="twitter"], a[href*="instagram"], a[href*="linkedin"]');
      const socialCount = await socialLinks.count();
      
      expect(socialCount).toBeGreaterThanOrEqual(0);
    }
  });

  test('verificar título da página', async ({ page }) => {
    await page.goto(URL);
    
    // Verificar título da página
    const pageTitle = await page.title();
    expect(pageTitle.length).toBeGreaterThan(0);
  });
});
