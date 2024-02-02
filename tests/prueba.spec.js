
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
    test.setTimeout(86400000);
    await page.goto('https://rawg.io/games/playstation5');
    await page.waitForTimeout(2000);
    await page.locator('.mode-select__items > div:nth-child(2)').click();

    await page.pause();

await page.getByRole('link', { name: 'Grand Theft Auto Vexceptional' }).click({
  button: 'middle'
});
await page.waitForTimeout(3000);
const page2 = await context.newPage();
await page2.goto('https://rawg.io/games/grand-theft-auto-v');
await page1.getByPlaceholder('Search 862,326 games').click();

    // try {
    //     let loadButtonExists = true;
    //     const gameListSelector = "#load-more-button";


    //     while (loadButtonExists) {
    //         // Check if the load more button exists
    //         loadButtonExists = await page.locator('.load-more__button').isVisible();

    //         if (loadButtonExists) {
    //             // Click the load more button
                
    //             await page.locator('.load-more__button').click();
    //             // Wait for some time to load more items (adjust as needed)
    //             await page.waitForTimeout(2000);
    //         }
    //     }

    //     // Continue with your assertions or further actions after loading all items

    // } catch (error) {
    //     console.error('Error:', error);
    // }
});


// const listSelector = await page.$$("#load-more-button > *");
//         const gameList = listSelector.length;
//         // await page.pause()
//         const loadButton = '.load-more__button'
//         console.log(gameList);
        

