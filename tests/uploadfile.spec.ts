import { test as base } from '@playwright/test';
import { Uploadfile } from '../src/pages/uploadfile.pom';


const test = base.extend <{
  uploadfile: Uploadfile
}>({
  uploadfile:({ page }, use)=> use(new Uploadfile( page ))
});

test('Interacting with Upload File', async({ uploadfile })=>{
  await uploadfile.navigate();
  await uploadfile.uploadFile();
});