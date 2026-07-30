import { Page, Locator, expect } from '@playwright/test';

export class Practiceform {
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
  }

  navigate() {
    return this.page.goto('/automation-practice-form');
  }
}
