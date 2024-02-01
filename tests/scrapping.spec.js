const { test, expect } = require('playwright/test');

test('has title', async ({ page }) => {
    test.setTimeout(86400000);
    await page.goto('https://rawg.io/games/grand-theft-auto-v');
    await page.waitForTimeout(2000);
    // await page.locator('.mode-select__items > div:nth-child(2)').click();
    await page.waitForTimeout(3000);
    // await page.waitForTimeout(4000);
    // await page.pause();


    // await page.getByRole('link', { name: 'Grand Theft Auto Vexceptional' }).click({
    //     modifiers: ['Control']
    //   });
      // const page6 = await context.newPage();
      // await page6.goto('https://rawg.io/games/grand-theft-auto-v');
    





      // await page.locator('.mode-select__items > div:nth-child(2)').click();
      // await page.locator('.load-more__button').click();
  
      // try {
      //     const gameListSelector = "#load-more-button";
          
      //     // const gameListOuterHTML = await page.$eval(gameListSelector, (element) => element.outerHTML);
      
      //     const childDivsContent = await page.$$eval(`${gameListSelector} > div`, (divs) => {
  
      //     //   return divs.length
            
      //     //   divs.map((div) => div.textContent.trim()); // Adjust this to extract the information you need
      //     });
          
      //     // console.log("Outer HTML of #load-more-button:", gameListOuterHTML);
      //     console.log("Content of child divs:", childDivsContent);
          
      // } catch (error) {
          
      // }

   


    // Extracting the image
    try {
        const gameArtSelector = "//div[@class='art art_colored']";
        const urlRegex = /url\(['"]?([^'"]+\.jpg)['"]?\)/;
    
        // Fetch the outer HTML content of the selected element
        const artContent = await page.$eval(gameArtSelector, element => element.outerHTML);
    
        // Match the URL using the regular expression
        const match = artContent.match(urlRegex);
    
        // Extract the captured URL (if any)
        const imageUrl = match ? match[1] : null;
        // await page.goto(imageUrl);
        console.log("image URL: " + imageUrl);
    } catch (error) {
        console.error("Error:", error);
    }
    

    // Extracting game title
    try {
        const gameTitle = await page.$eval('.game__title', (element) => element.textContent);
        console.log('Game Title:', gameTitle);

    } catch (error) {
        console.log("Null");
    };

    //Extracting about
    const readmoreSelector = "(//span[@role='button'])[2]";
    const readMoreButton = await page.$(readmoreSelector);
    
    if (readMoreButton) {
        await readMoreButton.click();
    } else {
        console.log("No read more button found");
    }
    
    try {
        const about = await page.$$eval('div[itemprop="description"] div', (elements) => {
            return elements.map((element) => element.textContent.replace(/\n|\+/g, ''));
        });
        console.log('About:', about);
    } catch (error) {
        console.log("Error retrieving information");
    }
    
    // Extracting average playtime
    try {
        const averagePlaytime = await page.$eval('.game__meta-playtime', (element) => {
            const text = element.textContent.trim();
            return text.replace('Average Playtime: ', '');
        });

        console.log('Average Playtime:', averagePlaytime);
    } catch (error) {
        console.log("Null");
    };

    // Extracting platforms
    try {
        const platforms = await page.$$eval("(//div[@class='game__meta-text'])[1]", (elements) => {
            return elements.map((element) => element.textContent);
        });
        console.log('Platforms:', platforms);


    } catch (error) {
        console.log("Null");
    };

    // Extracting genre
    try {
        const genre = await page.$eval("(//div[@class='game__meta-text'])[2]", (element) => element.textContent);
        console.log('Genre:', genre);

    } catch (error) {
        console.log("Null");
    };

    // Extracting release date
    try {
        const releaseDate = await page.$eval("(//div[@class='game__meta-text'])[3]", (element) => element.textContent);
        console.log('Release Date:', releaseDate);

    } catch (error) {
        console.log("Null");
    };
    // Extracting developer
    try {
        const developer = await page.$eval('.game__meta-text a[href^="/developers/"]', (element) => element.textContent);
        console.log('Developer:', developer);

    } catch (error) {
        console.log("Null");

    };

    // Extracting publisher
    try {
        const publisher = await page.$eval('.game__meta-text a[href^="/publishers/"]', (element) => element.textContent);
        console.log('Publisher:', publisher);

    } catch (error) {
        console.log("Null");

    };

    // Extracting age rating
    try {
        const ageRating = await page.$eval("//div[text()='Age rating']/following-sibling::div", (element) => element.textContent);
        console.log('Age Rating:', ageRating);

    } catch (error) {
        console.log("Null");

    };

    // Extracting tags
    try {
        const tags = await page.$$eval('.game__meta-text a[href^="/tags/"]', (elements) => {
            return elements.map((element) => element.textContent);
        });
        console.log('Tags:', tags);

    } catch (error) {
        console.log("Null");

    };
    
});








// const selector = '.page__content';
// //waitForSelector tells the browser to  wait until an element matching the specified selector appears on the page
// await page.waitForSelector(selector);
// const el = await page.$(selector);

// const text = await el.evaluate(e => e.innerHTML);
// console.log(text);




// const html = await page.evaluate(()=>
// document.documentElement.outerHTML
// );

// console.log(html);