import { Locator, Page } from '@playwright/test';

export class DragObject {
  readonly page: Page;
  readonly element: {
    dragElement: Locator
    destination: Locator
  };


  constructor(page) {
    this.page = page;
    this.element = {
      dragElement: page.locator('#draggable'),
      destination: page.locator('#droppableExample-tabpane-simple').locator('#droppable')
    };
  }

  navigate() {
    return this.page.goto('/droppable');
  }

  async dragToPlace() {
    await this.element.dragElement.dragTo(this.element.destination);
  }
}