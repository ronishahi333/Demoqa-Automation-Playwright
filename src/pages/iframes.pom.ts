import { Page } from '@playwright/test';

export class Iframes {
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
  }

  navigate() {
    return this.page.goto('/nestedframes');
  }
}