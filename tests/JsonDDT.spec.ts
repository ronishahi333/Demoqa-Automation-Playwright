import { test as base } from '@playwright/test';
import { Element } from '../src/pages/textbox.pom';
import collection from '../test-data/testdata.json';


const test = base.extend <{
    element: Element
}>({
  element:({ page }, use)=> use(new Element(( page )))
});


for (const data of collection) {
  test(`Filling up the form of ${data.fullName}`, async({ element })=>{
    await element.navigate();
    await element.fillForm(data.fullName, data.email, data.currentAddress, data.permanentAddress);
  });
}

