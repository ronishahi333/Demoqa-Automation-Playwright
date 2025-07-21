import { test as base, expect } from '@playwright/test';
import { DragObject } from '../src/pages/dragobject.pom';

const test = base.extend<{
    dragobject: DragObject
}>({
  dragobject:({ page }, use)=>use(new DragObject((page)))
});

test('Interacting with Slider', async({ dragobject, page })=>{
  await dragobject.navigate();
  await dragobject.dragToPlace();

  const assertDroppedText = page.getByText('Dropped');
  await expect(assertDroppedText).toBeVisible();
});