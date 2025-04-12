const { test } = require('@playwright/test');
const path = require('path');
// const fs = require('fs');

exports.test = test.extend({
  userGaragePage: async ({ browser, browserName }, use) => {
    if (browserName !== 'chromium') {
      test.skip();
    }

    const storageStatePath = path.resolve(__dirname, '../tests/authStorage.json');
    const context = await browser.newContext({ storageState: storageStatePath });
    const page = await context.newPage();
    await page.goto(process.env.URL_STORAGE_GARAGE); 

    await use(page);
    await context.close();
  },
});

