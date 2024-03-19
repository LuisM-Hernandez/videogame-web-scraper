# videogame-web-scraper

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  ## Description
  Automation made with Microsoft Playwright that have two functional tests using the website RAWG.io. The title scraping test goes through a list of games and it returns a txt file with the titles. The search and take test iterate through the list of titles on a txt document, write them on the searchbar and it clicks on the same name in suggested options, from there it grabs the following information and it writes it as a JSON file (Title, about, average playtime, platforms, genre, release date, developer, publisher, age rating and tags).

  A video demo of the automation showcasing the functionality can be seen here [videogame-web-scraper](https://drive.google.com/file/d/1iTRzXJjTPPMQrLoiLXyWaTxd14fP56T6/view?usp=drive_link)

  ## Installation
  ```
  npm i
  ```

  ## Usage
  ### Title Scraping
  1. Go to https://rawg.io/platforms and choose the platfor you want to scrape
  2. On line 6 paste the link of the platform you chose. For example if you would like to scrape PS5 titles it should be https://rawg.io/games/playstation5
  3. Next, input in the terminal the following command
   ```
  npx playwright test tests/titlescrape.spec.js --headed
   ```
  4. It should run and grab the titles and create a txt document called "output with the list of titles

 ### Game Info Scraping
  1. For this test the user need to have a txt file with a list of games. The path is already made to read from a txt document called output but it can be changed on line 11
  3. Next input in the terminal the following command
   ```
  npx playwright test tests/searchandtake.spec.js --headed
   ```
  4. The first iteration is manual because of a pop up that we need to close, after that it automates. We should click  the Step over button on the Playwright Inspector a total of 6 times and it should redirects us to the next page where the pop up appears. The image below shows where you need to click (yellow arrow).
  ![image](./public/img/automation%20instruction.png)
  5. Click the close button on the pop up and then click the Resume button on the Playwright Inspector and it should go through the list automatically.
  6. After it finishes the list or if we abort the automation it will create a JSON file named scrapedData.json with the title, about, average playtime, platforms, genre, release date, developer, publisher, age rating and tags of each individual game on the list.
  
  I made this as a learning experience using playwright, its functional but still in development for further improvements.
  Future implementations, image scraping and enhancing title scraping functionality.

  ## Contact

  If you have any questions about this repository, open an issue or contact me directly at m.luishernandez@outlook.com. 
  
  You can find more of my work at https://github.com/LuisM-Hernandez

  ## License

    This project is licensed under the MIT license.
