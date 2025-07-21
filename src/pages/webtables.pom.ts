import { Locator, Page, expect } from '@playwright/test';

export class Webtables {
  readonly page:Page;
  readonly element:{
    addButton:Locator,
    firstName:Locator,
    lastName:Locator,
    email:Locator,
    age:Locator,
    salary:Locator,
    department:Locator,
    submitButton:Locator
  };


  constructor(page) {
    this.page = page;
    this.element = {
      addButton:page.getByRole('button', { name:'Add' }),
      firstName: page.getByPlaceholder('First name'),
      lastName: page.getByPlaceholder('Last name'),
      email: page.getByPlaceholder('name@example.com'),
      age: page.getByPlaceholder('Age'),
      salary: page.getByPlaceholder('Salary'),
      department: page.getByPlaceholder('Department'),
      submitButton: page.getByRole('button', { name:'Submit' })
    };
  }

  navigate() {;
    return this.page.goto('/webtables');
  };

  async clickAddButton() {
    await this.element.addButton.click();
  }

  async fillform(firstName:string, lastName:string, email:string, age:number, salary:number, department:string) {
    await this.element.firstName.fill(firstName);
    await this.element.lastName.fill(lastName);
    await this.element.email.fill(email);
    await this.element.age.fill(`${age}`);
    await this.element.salary.fill(`${salary}`);
    await this.element.department.fill(department);
  };

  async clickSubmitButton() {;
    await this.element.submitButton.click();
  }

  async checkAddedRow() {
    const newRow = this.page.locator('[role="rowgroup"]').filter({ hasText:'Glenn' });
    await expect(newRow).toContainText(['Maxwell']);
  }

  // async checkAddedRow() {
  //   const getrow = this.page.locator('[role = "rowgroup"]');
  //   const countrow = await getrow.count();
  //   console.log(countrow);
  //   await expect(getrow).toHaveCount(countrow + 1);
  // }
}