import { expect, type Locator, type Page } from '@playwright/test';
import testData from '../../tests/data/demo.automationtesting.json';
import { BasePage } from './base.page';

export class BooksPage extends BasePage {
  readonly path = testData.url;

  readonly searchInput: Locator;
  readonly nextButton: Locator;
  readonly backToBookStoreButton: Locator;
  readonly titleWrapper: Locator;
  readonly isbnWrapper: Locator;

  constructor(page: Page) {
    super(page);

    this.searchInput = this.getByRole('textbox', { name: 'Type to search' });
    this.nextButton = this.getByRole('button', { name: 'Next' });
    this.backToBookStoreButton = this.getByRole('button', { name: 'Back To Book Store' });
    this.titleWrapper = this.locator('#title-wrapper');
    this.isbnWrapper = this.locator('#ISBN-wrapper');
  }

  bookLink(bookName: string): Locator {
    return this.getByRole('link', { name: bookName });
  }

  async expectBooksPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/books$/);
  }

  async searchBook(bookName: string): Promise<void> {
    await this.searchInput.fill(bookName);
  }

  async clearSearch(): Promise<void> {
    await this.searchInput.clear();
  }

  async openBookDetails(bookName: string): Promise<void> {
    await this.bookLink(bookName).click();
  }

  async goBackToBookStore(): Promise<void> {
    await this.backToBookStoreButton.click();
  }

  async expectBookVisible(bookName: string): Promise<void> {
    await expect(this.bookLink(bookName)).toBeVisible();
  }

  async expectBookNotVisible(bookName: string): Promise<void> {
    await expect(this.bookLink(bookName)).not.toBeVisible();
  }

  async expectBookDetails(title: string, isbn: string): Promise<void> {
    await expect(this.titleWrapper).toContainText(title);
    await expect(this.isbnWrapper).toContainText(isbn);
  }

  async expectNextButtonVisible(): Promise<void> {
    await expect(this.nextButton).toBeVisible();
  }
}
