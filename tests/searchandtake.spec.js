// @ts-check
const{ test, expect} = require('@playwright/test');

test('search and scrape', async ({page})=>{
    test.setTimeout(86400000);
    await page.goto('https://rawg.io/');

    const searchBar = await page.$('[role="searchbox"]');

    await searchBar?.type('Grand Theft Auto V', {delay:100})
    await page.getByRole('link', { name: 'Grand Theft Auto V', exact: true }).click();
    await page.frameLocator('iframe[name="aswift_1"]').getByLabel('Close ad').click();


    // await searchBar?.click();

 

    await page.pause();

});


