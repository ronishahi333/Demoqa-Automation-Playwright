import { test as base } from '@playwright/test';
import { TOTP } from '../src/pages/totp.pom';
import {generateOTP} from '../utils/config';

const test = base.extend <{
    totp: TOTP
}>({
  totp:({ page }, use)=> use (new TOTP ((page)))
});

test('Accessing the Authenticator', async({totp})=>{

    const email = process.env.EMAIL ?? "undefined";
    const password = process.env.PASSWORD ?? "undefined";
    const topSecret = process.env.TOTP_SECRET ?? "undefined";

    await totp.navigate();
    await totp.fillEmail(email);
    await totp.fillPassword(password);

    const code = await generateOTP(topSecret);

    await totp.fillMFACode(code);
    await totp.clickLoginButton();

    await totp.assertLoginText();

})