import { expect, Locator, Page } from "@playwright/test";

export class Browserwindows {
  readonly page: Page;
  readonly element: {
        newTab: Locator,
        newWindowMessage: Locator
    };

  constructor(page) {
    this.page = page;
    this.element = {
      newTab: page.getByRole ('button', { name: "New Tab" }),
      newWindowMessage: page.getByRole('button', { name: "New Window Message" })
    };
  };

  navigate() {
    return this.page.goto("/browser-windows");
  }

  async clicknewTabButton() {   // This also works for the new window popup as well not only the new tab
    const [newWindow] = await Promise.all([
      this.page.waitForEvent('popup'),
      await this.element.newTab.click()
    ]);

    await newWindow.waitForLoadState('networkidle');
    await expect(newWindow.getByText('This is a sample page')). toBeVisible();
    await newWindow.close();
  }

  async clickNewWindowMessage() {
    const [newWindow] = await Promise.all([
      this.page.waitForEvent('popup'),
      await this.element.newWindowMessage.click()
    ]);

    await newWindow.waitForLoadState('networkidle');
    const assertNewWindowText = newWindow.getByText(/^Knowledge.*organization\.$/);
    await expect(assertNewWindowText).toBeVisible();
  }
}