import { Locator, Page, expect } from "@playwright/test";


export class Radiobutton {
  readonly page: Page;
  readonly element:{
    yesButton:Locator
    maleOption:Locator
    };

  constructor(page) {
    this.page = page;
    this.element = {
      yesButton:page.getByRole('radio', { name: 'Yes' }),
      maleOption:page.getByLabel('Male', { exact: true })
    };
  }

  navigate() {
    return this.page.goto("/radio-button");
  };

  async checkButton() {
    await this.element.yesButton.click({ force:true });
  };

  async assertCheckButton() {
    const checkSelectedYes = this.page.getByText('You have selected Yes');
    await expect(checkSelectedYes).toBeVisible();
  };

  async radioPracticeForm() {
    await this.element.maleOption.click({ force:true });
  };
}
