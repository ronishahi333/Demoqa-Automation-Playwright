import { Locator, Page } from '@playwright/test';


export class Dropdown {
  readonly page: Page;
  readonly elements: {
    dropdownArrowState: Locator
    selectState: Locator
    dropdownArrowCity: Locator
    selectCity: Locator
    };


  constructor(page) {
    this.page = page;
    this.elements = {
      dropdownArrowState: page.locator('#state'),
      selectState: page.getByText('Haryana'),  // After opening the dropdown Use setTimeOut(()=>{debugger;},3000) in the console to freeze the browser to get this element
      dropdownArrowCity: page.locator('#city'),
      selectCity: page.getByText('Karnal', { exact:true })
    };
  }


  async dropdownPracticeForm() {
    await this.elements.dropdownArrowState.click();
    await this.elements.selectState.click();
    await this.elements.dropdownArrowCity.click();
    await this.elements.selectCity.click();
  }
}