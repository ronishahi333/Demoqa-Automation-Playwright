import { test as base } from '@playwright/test';
import { Checkbox } from '../src/pages/checkbox.pom';


const test = base.extend<{
    checkbox:Checkbox
}>({
  checkbox:({ page }, use)=>use(new Checkbox(page))
});


test('Interacting with Checkbox', async({ checkbox })=>{
  await checkbox.navigate();
  await checkbox.checkbox();
});