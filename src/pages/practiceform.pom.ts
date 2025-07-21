import { Page, Locator, expect } from '@playwright/test';

export class Practiceform {
  readonly page: Page;


  constructor(page) {
    this.page = page;
  }

  navigate() {
    return this.page.goto('/automation-practice-form');
  }
}
