import { expect, test } from '@playwright/test';
import {findContainer, startContainer, stopContainer} from './utils/containers';
import { login } from './utils/roles';

test.setTimeout(180_000);
test.describe('Connection', () => {
  test('can succeed even if Qtune starts while pusher is down @docker', async ({ page }) => {
    await page.goto(
      'http://play.workadventure.localhost/_/global/maps.workadventure.localhost/tests/mousewheel.json'
    );

    await login(page);

    // Let's stop the play container
    const container = await findContainer('play');
    await stopContainer(container);

    await expect(page.locator('.errorScreen p.code')).toContainText('CONNECTION_');
    //await expect(page.locator('.error-div')).toContainText('Unable to connect to Qtune');

    //await page.goto('http://play.workadventure.localhost/_/global/maps.workadventure.localhost/tests/mousewheel.json');
    //await expect(page.locator('.error-div')).toContainText('Unable to connect to Qtune');
    //await expect(page.locator('.errorScreen p.code')).toContainText('HTTP_ERROR');

    await startContainer(container);

    //await page.goto('http://play.workadventure.localhost/_/global/maps.workadventure.localhost/tests/mousewheel.json');
    await expect(page.locator("button#menuIcon")).toBeVisible({
      timeout: 180_000
    });
  });
});
