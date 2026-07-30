import { Locator, Page, expect } from '@playwright/test';

export class Radiobutton {
  readonly page: Page;
  readonly element: {
    yesButton: Locator,
    impressiveButton: Locator,
    maleOption: Locator
  };

  constructor(page: Page) {
    this.page = page;
    this.element = {
      yesButton: page.getByRole('radio', { name: 'Yes' }),
      impressiveButton: page.getByRole('radio', { name: 'Impressive' }),
      maleOption: page.getByLabel('Male', { exact: true })
    };
  }

  navigate() {
    return this.page.goto('/radio-button');
  }

  async checkButton() {
    await this.element.yesButton.click({ force: true });
  }

  async assertCheckButton() {
    const result = this.page.locator('p.mt-3 span.text-success');
    await expect(this.element.yesButton).toBeChecked();
    await expect(this.element.impressiveButton).not.toBeChecked();
    await expect(result).toHaveText('Yes');
  }

  async checkImpressiveButton() {
    await this.element.impressiveButton.click({ force: true });
  }

  async assertImpressiveButton() {
    const result = this.page.locator('p.mt-3 span.text-success');
    await expect(this.element.impressiveButton).toBeChecked();
    await expect(this.element.yesButton).not.toBeChecked();
    await expect(result).toHaveText('Impressive');
  }

  async radioPracticeForm() {
    await this.element.maleOption.click({ force: true });
  }
}
