import { test as base, expect } from '@playwright/test';
import { Tooltip } from '../src/pages/tooltip.pom';

const test = base.extend<{
    tooltip: Tooltip
}>({
  tooltip:({ page }, use)=>use(new Tooltip((page)))
});

test('Interacting with Slider', async({ tooltip, page })=>{
  await tooltip.navigate();
  await tooltip.hoverToButton();

  const hoverText = page.getByText('You hovered over the Button');
  await expect(hoverText).toBeVisible();
});