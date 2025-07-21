import { test as base } from '@playwright/test';
import { Dropdown } from '../src/pages/dropdown.pom';


const test = base.extend <{
    dropdown: Dropdown
}>({
  dropdown:({ page }, use)=> use (new Dropdown ((page)))
});


test('Interacting with dropdown', async({ dropdown })=>{
  await dropdown.dropdownPracticeForm();
});