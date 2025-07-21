import { test as base } from '@playwright/test';
import { Webtables } from '../src/pages/webtables.pom';


const test = base.extend <{
    webtables:Webtables
}>({
  webtables:({ page }, use)=>use(new Webtables(page))
});

const firstName = "Glenn";
const lastName = "Maxwell";
const email = "glennboy@maxwell.com";
const age = 35;
const salary = 500000;
const department = "QA";

test('Interacting with Webtables', async({ webtables })=>{
  await webtables.navigate();

  await webtables.clickAddButton();
  await webtables.fillform(firstName, lastName, email, age, salary, department);
  await webtables.clickSubmitButton();

  await webtables.checkAddedRow();
});