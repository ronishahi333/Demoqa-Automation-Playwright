import { Locator, Page } from '@playwright/test';

export class Tooltip {
  readonly page: Page;
  readonly element: {
    hoverButton: Locator
  };


  constructor(page) {
    this.page = page;
    this.element = {
      hoverButton: page.getByRole('button', { name: "Hover me to see" })
    };
  }

  navigate() {
    return this.page.goto('/tool-tips');
  }

  async hoverToButton() {
    await this.element.hoverButton.hover();
  }
}