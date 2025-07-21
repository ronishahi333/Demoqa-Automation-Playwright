import { test as base } from '@playwright/test';
import { Slider } from '../src/pages/slider.pom';

const test = base.extend<{
    slider: Slider
}>({
  slider:({ page }, use)=>use(new Slider((page)))
});

test('Interacting with Slider', async({ slider })=>{
  await slider.navigate();
  await slider.slideNumber();
});