import { test as base, expect } from '@playwright/test';
import { Browserwindows } from '../src/pages/browserwindows.pom';


const test = base.extend <{
  browserwindow: Browserwindows
}>({
  browserwindow: ({ page }, use)=> use(new Browserwindows(page))
});

test ('Interacting with browser popups', async({ browserwindow })=>{
  await browserwindow.navigate();
  await browserwindow.clicknewTabButton();
  await browserwindow.clickNewWindowMessage();
});