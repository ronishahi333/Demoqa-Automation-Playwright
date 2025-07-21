import { Locator, Page, expect } from '@playwright/test';

export class Element {
  readonly page: Page;
  readonly elements:{
      firstName:Locator,
      lastName:Locator
      fullName:Locator,
      email:Locator,
      mobileNumber:Locator,
      subjects:Locator,
      clickSubjects: Locator,
      currentAddress:Locator,
      permanentAddress:Locator,
      submitButton:Locator,
    };

  constructor(page:Page) {
    this.page = page;
    this.elements = {
      firstName:page.getByPlaceholder('First Name'),
      lastName:page.getByPlaceholder('Last Name'),
      fullName:page.getByPlaceholder('Full Name'),
      email:page.getByPlaceholder('name@example.com'),
      mobileNumber:page.getByPlaceholder('Mobile Number'),
      subjects: page.locator('#subjectsInput'),
      clickSubjects: page.locator('#react-select-2-option-0'),
      currentAddress:page.getByPlaceholder('Current Address'),
      permanentAddress:page.locator('#permanentAddress'),
      submitButton: page.getByRole('button', { name: 'Submit' })
    };
  }

  navigate() {
    return this.page.goto("/text-box");
  }

  async fillForm(fullName:string, email:string, currentAddress:string, permanentAddress:string) {
    await this.elements.fullName.fill(fullName);
    await this.elements.email.fill(email);
    await this.elements.currentAddress.fill(currentAddress);
    await this.elements.permanentAddress.fill(permanentAddress);
    await this.elements.submitButton.click();
  }

  async assertForm(fullName:string, email:string, currentAddress:string, permanentAddress:string) {
    const getfullName = this.page.locator('p#name');
    const getEmail = this.page.locator('p#email');
    const getCurrentAddress = this.page.locator('p#currentAddress');
    const getPermanentAddress = this.page.locator('p#permanentAddress');
    await expect(getfullName).toContainText(fullName);
    await expect(getEmail).toContainText(email);
    await expect(getCurrentAddress).toContainText(currentAddress);
    await expect(getPermanentAddress).toContainText(permanentAddress);
  };

  async textPracticeForm(firstName:string, lastName:string, email:string, mobileNumber:number, subjects:string, currentAddress:string) {
    await this.elements.firstName.fill(firstName);
    await this.elements.lastName.fill(lastName);
    await this.elements.email.fill(email);
    await this.elements.mobileNumber.fill(`${mobileNumber}`);
    await this.elements.currentAddress.fill(currentAddress);
    await this.elements.subjects.fill(subjects);
    await this.elements.clickSubjects.click();
  }
}