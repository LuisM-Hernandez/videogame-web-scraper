const { test, expect } = require("playwright/test");
const fs = require("fs");
test("scrape and take", async ({ page }) => {
  
  test.setTimeout(86400000);
  await page.goto("https://rawg.io/");

  await page.pause();

  // Reads the txt file
  const filePath = "output.txt";
  const titles = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .map((names) => names.trim());
  console.log(titles.length);

  // Search Bar locator
  const searchBar = await page.locator(".header__search__input");
  await page.waitForTimeout(3000);
  // await page.frameLocator('iframe[name="aswift_1"]').getByLabel('Close ad').click();

  // Array to store scraped data
  const scrapedData = [];

  try {
    
    // For loop that goes through the list and gets the information back to the terminal
    for (let i = 0; i < titles.length; i++) {
      await page.waitForTimeout(3000);
      await searchBar.click();
      await searchBar.type(`${titles[i]}`, { delay: 200 });
      await page.getByRole("link", { name: `${titles[i]}`, exact: true }).click();
      await page.waitForTimeout(3000);
  
      // Extracting the image
      // try {
      //     // Get the style attribute of the div element
      //     const styleAttribute = await page.$eval(".art.art_colored", (el) =>
      //       el.getAttribute("style")
      //     );
  
      //     // Extract the URL from the style attribute
      //     const urlMatch = styleAttribute.match(/url\(["']?([^"']*)["']?\)/);
      //     const imageUrl = urlMatch && urlMatch[1];
  
      //     console.log(imageUrl);
      //     scrapedData.push({ title: imageUrl });
      //   } catch (error) {
      //     console.error("Error:", error);
      //   }
  
      // Extracting game title
      try {
        const gameTitle = await page.$eval(
          ".game__title",
          (element) => element.textContent
        );
        console.log("Game Title:", gameTitle);
        scrapedData.push({ title: gameTitle });
      } catch (error) {
        console.log("Null");
        scrapedData.push({ title: null });
      }
  
      //Extracting about
      const readmoreSelector = "(//span[@role='button'])[2]";
      const readMoreButton = await page.$(readmoreSelector);
  
      if (readMoreButton) {
        await readMoreButton.click();
      } else {
        console.log("");
      }
  
      try {
        const about = await page.$$eval(
          'div[itemprop="description"] div',
          (elements) => {
            return elements.map((element) =>
              element.textContent.replace(/\n|\+/g, "")
            );
          }
        );
        console.log("About:", about);
        scrapedData[i].about = about;
      } catch (error) {
        console.log("Error retrieving information");
        scrapedData[i].about = null;
      }
  
      // Extracting average playtime
      try {
        const averagePlaytime = await page.$eval(
          ".game__meta-playtime",
          (element) => {
            const text = element.textContent.trim();
            return text.replace("Average Playtime: ", "");
          }
        );
        console.log("Average Playtime:", averagePlaytime);
        scrapedData[i].averagePlaytime = averagePlaytime;
      } catch (error) {
        console.log("Null");
        scrapedData[i].averagePlaytime = null;
      }
  
      // Extracting platforms
      try {
        const platforms = await page.$$eval(
          "(//div[@class='game__meta-text'])[1]",
          (elements) => {
            return elements.map((element) => element.textContent);
          }
        );
        console.log("Platforms:", platforms);
        scrapedData[i].platforms = platforms;
      } catch (error) {
        console.log("Null");
        scrapedData[i].platforms = null;
      }
  
      // Extracting genre
      try {
        const genre = await page.$eval(
          "(//div[@class='game__meta-text'])[2]",
          (element) => element.textContent
        );
        console.log("Genre:", genre);
        scrapedData[i].genre = genre;
      } catch (error) {
        console.log("Null");
        scrapedData[i].genre = null;
      }
  
      // Extracting release date
      try {
        const releaseDate = await page.$eval(
          "(//div[@class='game__meta-text'])[3]",
          (element) => element.textContent
        );
        console.log("Release Date:", releaseDate);
        scrapedData[i].releaseDate = releaseDate;
      } catch (error) {
        console.log("Null");
        scrapedData[i].releaseDate = null;
      }
  
      // Extracting developer
      try {
        const developer = await page.$eval(
          '.game__meta-text a[href^="/developers/"]',
          (element) => element.textContent
        );
        console.log("Developer:", developer);
        scrapedData[i].developer = developer;
      } catch (error) {
        console.log("Null");
        scrapedData[i].developer = null;
      }
  
      // Extracting publisher
      try {
        const publisher = await page.$eval(
          '.game__meta-text a[href^="/publishers/"]',
          (element) => element.textContent
        );
        console.log("Publisher:", publisher);
        scrapedData[i].publisher = publisher;
      } catch (error) {
        console.log("Null");
        scrapedData[i].publisher = null;
      }
  
      // Extracting age rating
      try {
        const ageRating = await page.$eval(
          "//div[text()='Age rating']/following-sibling::div",
          (element) => element.textContent
        );
        console.log("Age Rating:", ageRating);
        scrapedData[i].ageRating = ageRating;
      } catch (error) {
        console.log("Null");
        scrapedData[i].ageRating = null;
      }
  
      // Extracting tags
      try {
        const tags = await page.$$eval(
          '.game__meta-text a[href^="/tags/"]',
          (elements) => {
            return elements.map((element) => element.textContent);
          }
        );
        console.log("Tags:", tags);
        scrapedData[i].tags = tags;
      } catch (error) {
        console.log("Null");
        scrapedData[i].tags = null;
      }
    }
  } catch (error) {
    console.error("Error occurred, writing scraped data to file:", error);
    // Write scraped data up to the point of error to JSON file
    fs.writeFileSync("scrapedData.json", JSON.stringify(scrapedData, null, 2));
    
  }


  fs.writeFileSync("scrapedData.json", JSON.stringify(scrapedData, null, 2));

});











  // // Extracting game title
  // try {
  //   const gameTitle = await page.$eval(
  //     ".game__title",
  //     (element) => element.textContent
  //   );
  //   console.log("Game Title:", gameTitle);
  // } catch (error) {
  //   console.log("Null");
  // }
  // //Extracting about
  // const readmoreSelector = "(//span[@role='button'])[2]";
  // const readMoreButton = await page.$(readmoreSelector);

  // if (readMoreButton) {
  //   await readMoreButton.click();
  // } else {
  //   console.log("");
  // }

  // try {
  //   const about = await page.$$eval(
  //     'div[itemprop="description"] div',
  //     (elements) => {
  //       return elements.map((element) =>
  //         element.textContent.replace(/\n|\+/g, "")
  //       );
  //     }
  //   );
  //   console.log("About:", about);
  // } catch (error) {
  //   console.log("Error retrieving information");
  // }

  // // Extracting average playtime
  // try {
  //   const averagePlaytime = await page.$eval(
  //     ".game__meta-playtime",
  //     (element) => {
  //       const text = element.textContent.trim();
  //       return text.replace("Average Playtime: ", "");
  //     }
  //   );

  //   console.log("Average Playtime:", averagePlaytime);
  // } catch (error) {
  //   console.log("Null");
  // }

  // // Extracting platforms
  // try {
  //   const platforms = await page.$$eval(
  //     "(//div[@class='game__meta-text'])[1]",
  //     (elements) => {
  //       return elements.map((element) => element.textContent);
  //     }
  //   );
  //   console.log("Platforms:", platforms);
  // } catch (error) {
  //   console.log("Null");
  // }

  // // Extracting genre
  // try {
  //   const genre = await page.$eval(
  //     "(//div[@class='game__meta-text'])[2]",
  //     (element) => element.textContent
  //   );
  //   console.log("Genre:", genre);
  // } catch (error) {
  //   console.log("Null");
  // }

  // // Extracting release date
  // try {
  //   const releaseDate = await page.$eval(
  //     "(//div[@class='game__meta-text'])[3]",
  //     (element) => element.textContent
  //   );
  //   console.log("Release Date:", releaseDate);
  // } catch (error) {
  //   console.log("Null");
  // }
  // // Extracting developer
  // try {
  //   const developer = await page.$eval(
  //     '.game__meta-text a[href^="/developers/"]',
  //     (element) => element.textContent
  //   );
  //   console.log("Developer:", developer);
  // } catch (error) {
  //   console.log("Null");
  // }

  // // Extracting publisher
  // try {
  //   const publisher = await page.$eval(
  //     '.game__meta-text a[href^="/publishers/"]',
  //     (element) => element.textContent
  //   );
  //   console.log("Publisher:", publisher);
  // } catch (error) {
  //   console.log("Null");
  // }

  // // Extracting age rating
  // try {
  //   const ageRating = await page.$eval(
  //     "//div[text()='Age rating']/following-sibling::div",
  //     (element) => element.textContent
  //   );
  //   console.log("Age Rating:", ageRating);
  // } catch (error) {
  //   console.log("Null");
  // }

  // // Extracting tags
  // try {
  //   const tags = await page.$$eval(
  //     '.game__meta-text a[href^="/tags/"]',
  //     (elements) => {
  //       return elements.map((element) => element.textContent);
  //     }
  //   );
  //   console.log("Tags:", tags);
  // } catch (error) {
  //   console.log("Null");
  // }

