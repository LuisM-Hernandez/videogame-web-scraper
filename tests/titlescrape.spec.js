// @ts-check
const { test, expect } = require("@playwright/test");

test("title scrape", async ({ page }) => {
  test.setTimeout(86400000);
  await page.goto("https://rawg.io/games/playstation1/1976");
  await page.waitForTimeout(2000);
  await page.locator(".mode-select__items > div:nth-child(2)").click();
  await page.waitForTimeout(1000);

  const fs = require("fs").promises;

  // await page.pause();
  const loadBtn = await page.locator(".load-more__button");
  const parentElement = await page.$(".load-more");
  let children = await parentElement?.$$(".game-card-large");
  let childrenCount = children?.length;
  const textFileName = 'list.txt'
  const jsonFileNameArray = 'list_array.json';
  const jsonFileNameIndividual = 'list_individual.json';

  while (childrenCount !== 1666) {
    await page.waitForTimeout(2000);
    await loadBtn.click();
    await page.waitForTimeout(3000);
    
    // Refresh children count after clicking the button
    children = await parentElement?.$$(".game-card-large");
    childrenCount = children?.length;
  }
  
  if (childrenCount < 40) {
    console.log("Children count is less than 40. Exiting test.");
  }
  // console.log("Children count reached " + childrenCount);
const titles = [];
  try {
    if (children) {
      for (const child of children) {
          const titleText = await child.$eval('a', element => element.textContent);
          // console.log("Title: " + titleText);
          await fs.appendFile(textFileName, `${titleText}\n`, 'utf-8');
          titles.push(titleText);
          // console.log(titles);
      }
    }
  } catch (error) {
    console.log(error);
  }
  // Save titles array to a JSON file
  const jsonContentArray = JSON.stringify({ titles }, null, 2);
  await fs.writeFile(jsonFileNameArray, jsonContentArray, 'utf-8');
  
  // Save individual titles to another JSON file
  const jsonContentIndividual = JSON.stringify(titles.map(title => ({ title })), null, 2);
  await fs.writeFile(jsonFileNameIndividual, jsonContentIndividual, 'utf-8');
  
  console.log(`Titles saved to ${textFileName}, ${jsonFileNameArray}, and ${jsonFileNameIndividual}`);
  
});
