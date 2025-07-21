import { Locator, Page } from '@playwright/test';

export class Alerts {
  readonly page: Page;
  readonly elements: {
        clickmeButtonOne: Locator,
        clickmeButtonThree: Locator
        clickmeButtonFour: Locator
    };

  constructor(page) {
    this.page = page;
    this.elements = {
      clickmeButtonOne: page.locator('#alertButton'),
      clickmeButtonThree: page.locator('#confirmButton'),
      clickmeButtonFour: page.locator('#promtButton'),
    };
  }

  navigate() {
    return this.page.goto('/alerts');
  }

  async clickmeButtonOne() {
    await this.elements.clickmeButtonOne.click();
  }

  async clickmeButtonThree() {
    await this.elements.clickmeButtonThree.click();
  }

  async clickmeButtonFour() {
    await this.elements.clickmeButtonFour.click();
  }
}