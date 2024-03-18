// @ts-check
const { test, expect } = require('@playwright/test');

test('title scrape', async ({ page }) => {
  test.setTimeout(86400000);
    await page.goto('https://rawg.io/games/playstation5');
    await page.waitForTimeout(2000);
    await page.locator('.mode-select__items > div:nth-child(2)').click();

    const fs = require('fs').promises;

    await page.pause()
    try {
        const gameListSelector = "#load-more-button";
        const titles = [];
        const textFileName = 'output.txt';
        const jsonFileNameArray = 'output_array.json';
        const jsonFileNameIndividual = 'output_individual.json';
        
        
        let titlesCollected = 0;
        while (titlesCollected < 15000) {
            const childDivs = await page.$$(gameListSelector + " > div");
            console.log(childDivs.length);
            //I need better understanding of this
        
            for (let i = 0; i < childDivs.length && titlesCollected < 15000; i++) {
                try {
                    const titleElement = await childDivs[i].$(".game-card-compact__heading.game-card-compact__heading_with-link");
        
                    if (titleElement) {
                        const titleText = await titleElement.textContent();
                        console.log("Title:", titleText);
                        titles.push(titleText);
                        titlesCollected++;
    
                        // Append the title text to the text file
                        await fs.appendFile(textFileName, `${titleText}\n`, 'utf-8');
                    } else {
                        // console.error("Title element not found");
                    }
        
                    // Check if it's the last child div
                    if (i === childDivs.length - 1) {
                        // Click the button with the class 'load-more__button'
                        const button = await childDivs[i].$(".load-more__button");
                        if (button) {
                            await button.click();
                            // console.log("Clicked the button");
                            // Give some time for new items to load
                            await page.waitForTimeout(7000); // Adjust the timeout as needed
                        } else {
                            // console.error("Button not found");
                            break; // Stop the loop if the button is not found
                        }
                    }
                } catch (innerError) {
                    console.error(`Error in iteration ${i}:`, innerError);
                }
            }
        }
        
        // // Save titles array to a JSON file
        // const jsonContentArray = JSON.stringify({ titles }, null, 2);
        // await fs.writeFile(jsonFileNameArray, jsonContentArray, 'utf-8');
        
        // // Save individual titles to another JSON file
        // const jsonContentIndividual = JSON.stringify(titles.map(title => ({ title })), null, 2);
        // await fs.writeFile(jsonFileNameIndividual, jsonContentIndividual, 'utf-8');
        
        // console.log(`Titles saved to ${textFileName}, ${jsonFileNameArray}, and ${jsonFileNameIndividual}`);
        
    } catch (error) {
        // Handle errors
        console.error(error);
    };


});

