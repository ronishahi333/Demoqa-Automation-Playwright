import { Page, Locator, expect } from '@playwright/test';

export class TOTP {
  readonly page:Page;
  readonly element: {
    email: Locator
    password: Locator,
    code: Locator,
    loginbutton: Locator,
    logintext: Locator
  };

  constructor(page: Page) {
    this.page = page;
    this.element = {
      email: page.getByPlaceholder('E-Mail Address'),
      password:page.getByPlaceholder('Password'),
      code:page.getByLabel('Enter your MFA Code:'),
      loginbutton: page.locator('[value="Log In"]'),
      logintext: page.getByText('Login Success')
    };
  };

  async navigate(){
    await this.page.goto('https://authenticationtest.com/totpChallenge/');
  }

  async fillEmail(email:string){
    await this.element.email.fill(email);
  }

  async fillPassword(password:string){
    await this.element.password.fill(password);
  }

  async fillMFACode(digit:string){
    await this.element.code.fill(digit)
  }

 async clickLoginButton(){
    await this.element.loginbutton.click();
  }

  async assertLoginText(){
    await expect(this.element.logintext).toBeVisible();
  }
}
