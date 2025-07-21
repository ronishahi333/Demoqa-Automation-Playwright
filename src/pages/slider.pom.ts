import { Locator, Page } from '@playwright/test';

export class Slider {
  readonly page: Page;
  readonly element: {
    slider: Locator
  };


  constructor(page) {
    this.page = page;
    this.element = {
      slider: page.getByRole('slider')
    };
  }

  navigate() {
    return this.page.goto('/slider');
  }

  async slideNumber() {
    await this.element.slider.fill('95');
  }
}