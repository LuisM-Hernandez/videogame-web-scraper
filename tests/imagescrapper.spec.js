const { test, expect } = require("playwright/test");
const fs = require("fs");
test("image scrapper", async ({ page }) => {
  test.setTimeout(86400000);
  await page.goto("https://rawg.io/");

  // Reads the txt file
  const filePath = "output.txt";
  const titles = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .map((names) => names.trim());
  console.log(titles.length);

  // Search Bar locator
  const searchBar = await page.locator(".header__search__input");
  await page.waitForTimeout(2000);
  // await page.frameLocator('iframe[name="aswift_1"]').getByLabel('Close ad').click();

  // For loop that goes through the list and gets the information back to the terminal
  for (let i = 0; i < titles.length; i++) {
    await page.waitForTimeout(2000);
    await searchBar.click();
    await searchBar.type(`${titles[i]}`, { delay: 100 });
    await page.pause();
    await page.getByRole("link", { name: `${titles[i]}`, exact: true }).click();
    await page.waitForTimeout(2000);

    // Extracting the image
    try {
      // Get the style attribute of the div element
      const styleAttribute = await page.$eval(".art.art_colored", (el) =>
        el.getAttribute("style")
      );

      // Extract the URL from the style attribute
      const urlMatch = styleAttribute.match(/url\(["']?([^"']*)["']?\)/);
      const imageUrl = urlMatch && urlMatch[1];

      console.log(imageUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  }
});

// const { test, expect } = require('@playwright/test');

// test('has title', async ({ page }) => {
//     test.setTimeout(86400000);
//     await page.goto('https://rawg.io/games/playstation5');
//     await page.waitForTimeout(2000);
//     await page.locator('.mode-select__items > div:nth-child(2)').click();

//     await page.pause();

// await page.getByRole('link', { name: 'Grand Theft Auto Vexceptional' }).click({
//   button: 'middle'
// });
// await page.waitForTimeout(3000);
// const page2 = await context.newPage();
// await page2.goto('https://rawg.io/games/grand-theft-auto-v');
// await page1.getByPlaceholder('Search 862,326 games').click();

//     try {
//         let loadButtonExists = true;
//         const gameListSelector = "#load-more-button";

//         while (loadButtonExists) {
//             // Check if the load more button exists
//             loadButtonExists = await page.locator('.load-more__button').isVisible();

//             if (loadButtonExists) {
//                 // Click the load more button

//                 await page.locator('.load-more__button').click();
//                 // Wait for some time to load more items (adjust as needed)
//                 await page.waitForTimeout(2000);
//             }
//         }

//         // Continue with your assertions or further actions after loading all items

//     } catch (error) {
//         console.error('Error:', error);
//     }
// });

// const listSelector = await page.$$("#load-more-button > *");
//         const gameList = listSelector.length;
//         // await page.pause()
//         const loadButton = '.load-more__button'
//         console.log(gameList);
