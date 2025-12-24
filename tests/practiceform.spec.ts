import { test as base } from '@playwright/test';
import { Element } from '../src/pages/textbox.pom';
import { Practiceform } from '../src/pages/practiceform.pom';
import { Radiobutton } from '../src/pages/radiobutton.pom';
import { Date } from '../src/pages/date.pom';
import { Checkbox } from '../src/pages/checkbox.pom';
import { Uploadfile } from '../src/pages/uploadfile.pom';
import { Dropdown } from '../src/pages/dropdown.pom';


const test = base.extend <{
    element:Element
    radiobutton: Radiobutton
    practiceform: Practiceform
    date: Date
    checkbox: Checkbox
    uploadfile: Uploadfile
    dropdown: Dropdown

}>({
  element:({ page }, use)=> use(new Element(page)),
  radiobutton:({ page }, use)=> use(new Radiobutton(page)),
  practiceform:({ page }, use)=> use(new Practiceform(page)),
  date:({ page }, use)=> use(new Date(page)),
  checkbox:({ page }, use)=> use(new Checkbox(page)),
  uploadfile:({ page }, use)=> use(new Uploadfile(page)),
  dropdown:({ page }, use)=> use(new Dropdown(page))
});


const firstName = "Shane";
const lastName = "Watson";
const email = "watty@yopmail.com";
const mobileNumber = 9841220000;
const subjects = "English";
const currentAddress = "Gwarko ko flyover";

test('Filling up the practice form', async({ element, practiceform, radiobutton, date, checkbox, uploadfile, dropdown })=>{
  await practiceform.navigate();
  await element.textPracticeForm(firstName, lastName, email, mobileNumber, subjects, currentAddress);
  await radiobutton.radioPracticeForm();
  await date.datePracticeForm();
  await checkbox.checkboxPracticeForm();
  await uploadfile.imageUploadPracticeForms();
  await dropdown.dropdownPracticeForm();
});