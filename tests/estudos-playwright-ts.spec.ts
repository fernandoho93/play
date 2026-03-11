import { test, expect } from '@playwright/test';
import testData from './data/estudos-playwright-ts.json';

test.describe('Estudos Playwright + TS', () => {
  test.beforeEach(async ({ page }) => {
    // Pagina de treino recomendada para praticar interacoes
    await page.goto(testData.url);
  });

  test('deve abrir a pagina de tarefas', async ({ page }) => {
    await expect(page).toHaveTitle(new RegExp(testData.titlePattern));
    await expect(page.locator(testData.selectors.todoInput)).toBeVisible();
  });

  test('deve criar uma nova tarefa', async ({ page }) => {
    const input = page.locator(testData.selectors.todoInput);
    await input.fill(testData.texts.taskStudy);
    await input.press(testData.keys.submit);

    await expect(
      page.locator(testData.selectors.todoTitle).getByText(testData.texts.taskStudy)
    ).toBeVisible();
  });

  test('deve marcar tarefa como concluida', async ({ page }) => {
    const input = page.locator(testData.selectors.todoInput);
    await input.fill(testData.texts.taskFinish);
    await input.press(testData.keys.submit);

    await page.locator(testData.selectors.toggleTodo).first().click();
    await expect(page.locator(testData.selectors.todoItem)).toHaveClass(/completed/);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
  
});
