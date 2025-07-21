import { test as base, expect } from '@playwright/test';
import { Alerts } from '../src/pages/alerts.pom';

const test = base.extend <{
    alerts: Alerts
}>({
  alerts:({ page }, use)=> use(new Alerts(page))
});

test.describe('Interacting with dialog alerts popups', ()=>{
  test ('Interacting with AlertButton', async({ alerts, page })=>{
    page.on('dialog', async(alert)=>{
      const alertmessage1 = alert.message();
      await expect(alertmessage1).toEqual('You clicked a button');
      alert.accept();
    });

    await alerts.navigate();
    await alerts.clickmeButtonOne();
  });

  test ('Interacting with Confirm/Cancel Alert Button', async({ alerts, page })=>{
    page.on('dialog', async(alert)=>{
      const alertmessage3 = alert.message();
      await expect(alertmessage3).toEqual('Do you confirm action?');
      //alert.accept(); //Use this to click "Ok" button
      alert.dismiss();
    });

    await alerts.navigate();
    await alerts.clickmeButtonThree();

    const assertClickedCancel = await page.locator('span#confirmResult');
    await expect(assertClickedCancel).toHaveText('You selected Cancel');
  });

  test ('Interacting with Alert Button', async({ page, alerts })=>{
    page.on('dialog', async(alert)=>{
      const alertmessage4 = alert.message();
      await expect(alertmessage4).toEqual('Please enter your name');
      alert.accept('Hari Puttar');
    });

    await alerts.navigate();
    await alerts.clickmeButtonFour();

    const assertClickedCancel = await page.locator('span#promptResult');
    await expect(assertClickedCancel).toHaveText('You entered Hari Puttar');
  });
});

