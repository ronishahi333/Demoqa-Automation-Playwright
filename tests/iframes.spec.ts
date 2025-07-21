import { expect, test as base } from '@playwright/test';
import { Iframes } from '../src/pages/iframes.pom';

const test = base.extend <{
    iframes:Iframes;
}>({
  iframes:({ page }, use)=> use (new Iframes(( page )))
});

test('Interacting with Iframes', async({ page, iframes })=>{
  await iframes.navigate();
  const locateframe = page.frameLocator('#frame1').frameLocator('[srcdoc = "<p>Child Iframe</p>"]');
  const locatetext = locateframe.getByText('Child Iframe');
  await expect (locatetext).toBeVisible();
});