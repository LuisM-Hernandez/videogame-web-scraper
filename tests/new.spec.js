
// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs').promises;

test('title scrape', async ({ page }) => {
  test.setTimeout(86400000);
    await page.goto('https://rawg.io/games/playstation1');
    await page.waitForTimeout(2000);
    // await page.locator('.mode-select__items > div:nth-child(2)').click();
    await page.waitForTimeout(3000);
    await page.pause();
    await page.locator('button').filter({ hasText: 'Release date' }).click();
    await page.getByRole('link').hover('');
    
    await page.getByRole('button', { name: '1998', exact: true }).click();
    await page.locator('.mode-select__items > div:nth-child(2)').click();


    const loadBtn = await page.locator(".load-more__button");
    const parentElement = await page.$(".load-more");
    let children = await parentElement?.$$(".game-card-large");
    let childrenCount = children?.length;
    console.log(childrenCount);
    const textFileName = 'list.txt'
    const jsonFileNameArray = 'list_array.json';
    const jsonFileNameIndividual = 'list_individual.json';

    // try {
    //     while (childrenCount) {
            
    //     }
    // } catch (error) {
        
    // }



});

