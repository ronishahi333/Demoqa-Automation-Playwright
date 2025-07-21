import { test as base } from '@playwright/test';
import { Element } from '../src/pages/textbox.pom';

const fullName = "David Warner";
const email = "david@yopmail.com";
const currentAddress = "Putalisadak";
const permanentAddress = "Australia";

const test = base.extend<{
    element:Element
}>({
  element:({ page }, use)=>use(new Element(page))
});


test('Interacting with Text Box', async({ element })=>{
  await element.navigate();
  await element.fillForm(fullName, email, currentAddress, permanentAddress);
  await element.assertForm(fullName, email, currentAddress, permanentAddress );

});


