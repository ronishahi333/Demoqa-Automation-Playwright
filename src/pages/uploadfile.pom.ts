import { Locator, Page, expect } from '@playwright/test';
import path from 'path';


export class Uploadfile {
  readonly page: Page;
  readonly element:{
    upload: Locator
    formImageUpload: Locator
  };


  constructor(page) {
    this.page = page;
    this.element = {
      upload: page.getByLabel('Select a file'),
      formImageUpload: page.locator('#uploadPicture')
    };
  }

  navigate() {
    return this.page.goto('/upload-download');
  };

  async uploadFile() {
    const filepath = path.resolve(__dirname, '../../test-data/Kungfu.png');
    await this.element.upload.setInputFiles(filepath);
  };

  async assertUploadedFile() {
    const getExactfile = this.page.locator('#uploadedFilePath');
    await expect(getExactfile).toBeVisible();
  }

  async imageUploadPracticeForm() {
    await this.element.formImageUpload.setInputFiles(path.resolve(__dirname, '../../test-data/Bully.png'));
  }
}