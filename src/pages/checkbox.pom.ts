import { Locator, Page, expect } from "@playwright/test";


export class Checkbox {
  readonly page: Page;
  readonly element:{
    dropdownHome: Locator,
    dropdownDesktop: Locator,
    checkNotes:Locator
    checkSports: Locator
    checkMusic: Locator
    };

  constructor(page) {
    this.page = page;
    this.element = {
      dropdownHome: page.getByTitle('Toggle'),
      dropdownDesktop: page.locator ('ol ol > li:nth-child(1) [title = "Toggle"]'),
      checkNotes:page.locator('[for="tree-node-notes"]'),
      checkSports: page.locator('#hobbies-checkbox-1'),
      checkMusic: page.locator('#hobbies-checkbox-3')
    };
  }

  navigate() {
    return this.page.goto("/checkbox");
  };

  async checkbox() {
    await this.element.dropdownHome.first().click();
    await this.element.dropdownDesktop.click();
    await this.element.checkNotes.click();
  };

  async assertCheckboxResult() {
    const checkSelectedDesktop = this.page.getByText('notes');
    await expect(checkSelectedDesktop).toBeVisible();
  }

  async checkboxPracticeForm() {
    await this.element.checkSports.check({ force: true });
    await this.element.checkMusic.check({ force: true });
  }

}
