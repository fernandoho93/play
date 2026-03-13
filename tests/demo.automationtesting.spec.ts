import { test } from '@playwright/test';
import { BooksPage } from '../src/pages/books.page';

test.describe('DemoQA Books', () => {
  test('Cenario 1 - deve abrir a pagina de livros', async ({ page }) => {
    const booksPage = new BooksPage(page);

    await booksPage.goto();
    await booksPage.expectBooksPageLoaded();
  });

  test('Cenario 2 - deve pesquisar por um livro', async ({ page }) => {
    const booksPage = new BooksPage(page);

    await booksPage.goto();
    await booksPage.searchBook('Git Pocket Guide');
    await booksPage.expectBookVisible('Git Pocket Guide');
  });

  test('Cenario 3 - deve validar detalhes do livro e voltar para a lista', async ({ page }) => {
    const booksPage = new BooksPage(page);

    await booksPage.goto();
    await booksPage.searchBook('Git Pocket Guide');
    await booksPage.openBookDetails('Git Pocket Guide');
    await booksPage.expectBookDetails('Git Pocket Guide', '9781449325862');
    await booksPage.goBackToBookStore();
    await booksPage.expectBooksPageLoaded();
  });

  test('Cenario 4 - deve exibir lista vazia ao pesquisar um livro inexistente', async ({ page }) => {
    const booksPage = new BooksPage(page);

    await booksPage.goto();
    await booksPage.searchBook('Livro Inexistente 123');
    await booksPage.expectBookNotVisible('Git Pocket Guide');
  });

  test('Cenario 5 - deve exibir o botao para avancar para a proxima pagina', async ({ page }) => {
    const booksPage = new BooksPage(page);

    await booksPage.goto();
    await booksPage.expectNextButtonVisible();
  });

  test('Cenario 6 - deve limpar a busca e exibir novamente a lista completa', async ({ page }) => {
    const booksPage = new BooksPage(page);

    await booksPage.goto();
    await booksPage.searchBook('Git Pocket Guide');
    await booksPage.expectBookVisible('Git Pocket Guide');
    await booksPage.expectBookNotVisible('Learning JavaScript Design Patterns');
    await booksPage.clearSearch();
    await booksPage.expectBookVisible('Git Pocket Guide');
    await booksPage.expectBookVisible('Learning JavaScript Design Patterns');
  });
});
