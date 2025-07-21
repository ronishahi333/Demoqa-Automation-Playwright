import { Page, Locator } from '@playwright/test';

export class Date {
  readonly page:Page;
  readonly element: {
    calender: Locator
    year: Locator,
    month: Locator,
    day: Locator
  };

  constructor(page) {
    this.page = page;
    this.element = {
      calender: page.locator('#dateOfBirthInput'),
      year:page.locator('.react-datepicker__year-select'),
      month:page.locator('.react-datepicker__month-select'),
      day:page.locator('[aria-label="Choose Friday, August 1st, 2025"]')
    };
  };

  async datePracticeForm() {
    await this.element.calender.click();
    await this.element.year.selectOption('2025');
    await this.element.month.selectOption({ label:'August' });
    await this.element.day.click();
  }
}