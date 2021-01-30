import { By, ThenableWebDriver } from "selenium-webdriver";
import { scrollPage, itemInfo } from "./index";

const ASOS_URL = "https://www.asos.com/us/search/?q=";
const TITLE = "h1";
const PRICE = "//span[@data-id='current-price']";
const IMAGE_TAG = "gallery-image";
const SRC = "src";
const SEARCH_RESULTS = "//article[@data-auto-id='productTile']";
const SEARCH_TITLE = ".//div[@data-auto-id='productTileDescription']";
const SEARCH_PRICE = ".//span[@data-auto-id='productTilePrice']";
const SEARCH_SALE_PRICE = ".//span[@data-auto-id='productTileSaleAmount']";
const SEARCH_IMAGE = ".//img[@data-auto-id='productTileImage']";
const ANCHOR_TAG = "a";
const HREF_TAG = "href";

// ASOS scraping item given url
export const scrapeAsosUrl = (driver: ThenableWebDriver, URL: string) => {
  try {
    // navigate to bestbuy item page
    return driver.get(URL).then(async () => {
      const title = await driver.findElement(By.css(TITLE)).getText();

      const priceText = await driver.findElement(By.xpath(PRICE)).getText();
      const price = +priceText.substring(2);

      const imageURL = await driver.findElement(By.className(IMAGE_TAG)).getAttribute(SRC);

      const info: itemInfo = { title, price, itemURL: URL, imageURL };
      return info;
    });
  } catch (err) {
    console.error(err);
  }
};

export const scrapeAsosSearch = async (driver: ThenableWebDriver, input: string) => {
  // create search query string
  const searchQuery = input.replace(" ", "+");

  try {
    // navigate to ASOS
    return await driver.get(ASOS_URL + searchQuery).then(async () => {
      return await driver.findElements(By.xpath(SEARCH_RESULTS)).then(async (items) => {
        // scrape all search results for title and price
        let results = items.map(async (item) => {
          // scroll page to load images
          scrollPage(driver, 3);

          const title = await item.findElement(By.xpath(SEARCH_TITLE)).getText();

          let priceText: string;
          try {
            priceText = await item.findElement(By.xpath(SEARCH_SALE_PRICE)).getText();
          } catch {
            priceText = await item.findElement(By.xpath(SEARCH_PRICE)).getText();
          }
          const price = +priceText.substring(2);

          const URL = await item.findElement(By.css(ANCHOR_TAG)).getAttribute(HREF_TAG);

          const imageURL = await item.findElement(By.xpath(SEARCH_IMAGE)).getAttribute("src");

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
