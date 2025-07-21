import { test as base } from '@playwright/test';
import { Radiobutton } from '../src/pages/radiobutton.pom';


const test = base.extend<{
    radiobutton:Radiobutton
}>({
  radiobutton:({ page }, use)=>use(new Radiobutton(page))
});


test('Interacting with Radiobutton', async({ radiobutton })=>{
  await radiobutton.navigate();
  await radiobutton.checkButton();
});