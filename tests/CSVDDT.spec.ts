import { test as base } from '@playwright/test';
import { Element } from '../src/pages/textbox.pom';
import path from 'path';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

interface CSVRecord {
    Name: string
    Email: string
    CurrentAddress: string
    PermanentAddress: string
}

const test = base.extend <{
  element: Element
}>({
  element: ({ page }, use)=> use(new Element(( page )))
});

const filePath = path.resolve(__dirname, '../test-data/testdata.csv');
const fileContent = fs.readFileSync(filePath, 'utf8');
const records = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true
}) as CSVRecord[];

for (const record of records) {
  test(`Submitting the form of - ${record.Name}`, async({ element })=>{
    await element.navigate();
    await element.fillForm(record.Name, record.Email, record.CurrentAddress, record.PermanentAddress);
  });

};