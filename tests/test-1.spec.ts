import { test, expect } from '@playwright/test';

test('testes google ', async ({ page }) => {
  await page.goto('https://www.google.com/?zx=1772290023119&no_sw_cr=1');
  await page.getByRole('combobox', { name: 'Pesquisar' }).click();
  await page.getByRole('combobox', { name: 'Pesquisar' }).fill('playwright');

});