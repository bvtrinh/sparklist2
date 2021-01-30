import { By, until } from "selenium-webdriver";
import { driver, itemInfo, scrollPage } from "./index";

const FOOTLOCKER_URL = "https://www.footlocker.ca/en/search?query=";
const TITLE = "ProductName-primary";
const PRICE = "ProductPrice";
const PRICE_FINAL = "ProductPrice-final";
const SEARCH_RESULTS = "SearchResults";
const SEARCH_LIST = "ProductCard";
const IMAGE_SELECTOR = "//span[@class='Image Image--product Image--square']/img";

// Footlocker scraping item given url
export const footlockerScrape = (url: string) => {
  try {
    // navigate to bestbuy item page
    return driver.get(url).then(async () => {
      const title = await (await (await driver).findElement(By.className(TITLE))).getText();

      const priceText = await (await (await driver).findElement(By.className(PRICE))).getText();
      const price = +priceText.substring(1);

      const imageElement = await (await driver).findElement(By.xpath(IMAGE_SELECTOR));
      const imageURL = await imageElement.getAttribute("src");

      const info: itemInfo = { title, price, itemURL: url, imageURL };
      return info;
    });
  } catch (err) {
    console.error(err);
  }
};

export const massFootlockerScrape = async (input: string) => {
  //create search query string
  const searchQuery = input.replace(" ", "%20");

  try {
    // navigate to footlocker
    return await driver.get(FOOTLOCKER_URL + searchQuery).then(async () => {
      // wait for page to load
      await driver.wait(until.elementLocated(By.className(SEARCH_RESULTS)), 10000);
      await scrollPage(driver, 2);

      return await (await driver).findElements(By.className(SEARCH_LIST)).then(async (items) => {
        // scrape all search results for title and price
        let results = items.map(async (item) => {
          const title = await (await item.findElement(By.className(TITLE))).getText();

          let priceText: string;
          // look for sale price, otherwise get regular price
          try {
            priceText = await (await item.findElement(By.className(PRICE_FINAL))).getText();
          } catch (err) {
            priceText = await (await item.findElement(By.className(PRICE))).getText();
          }

          const URL = await (await item.findElement(By.css("a"))).getAttribute("href");

          const imageElement = item.findElement(By.css("img"));
          const imageURL = await imageElement.getAttribute("src");

          const price = +priceText.substring(1);

          const info: itemInfo = { title, price, itemURL: URL, imageURL };
          return info;
        });

        return Promise.all(results);
      });
    });
  } catch (err) {
    console.error(err);
  }
};
