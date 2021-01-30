import { By, until } from "selenium-webdriver";
import { driver, itemInfo, scrollPage } from "./index";

const BESTBUY_URL = "https://www.bestbuy.ca/en-ca/search?search=";
const TITLE_IDENTIFIER = "h1";
const PRICE_IDENTIFIER = "screenReaderOnly_3anTj";
const PRODUCT_LIST_IDENTIFIER = "x-productListItem";
const PRODUCT_LIST_TITLE_IDENT = ".//div[@data-automation='productItemName']";
const IMAGE_SELECTOR = "//img[@class='productImage_1NbKv']";
const SEARCH_IMAGE_SELECTOR = ".//img[@class='productItemImage_1en8J']";
const IMAGE_ATTRIBUTE = "src";
const ANCHOR_TAG = "a";
const HREF_TAG = "href";

// Bestbuy scraping item given url
export const bestBuyScrape = (url: string) => {
  try {
    // navigate to bestbuy item page
    return driver.get(url).then(async () => {
      const title = await driver.findElement(By.css(TITLE_IDENTIFIER)).getText();

      const priceText = await driver.findElement(By.className(PRICE_IDENTIFIER)).getText();
      const price = +priceText.substring(1);

      const imageElement = await driver.findElement(By.xpath(IMAGE_SELECTOR));
      const imageURL = await imageElement.getAttribute(IMAGE_ATTRIBUTE);

      const info: itemInfo = { title, price, itemURL: url, imageURL };
      return info;
    });
  } catch (err) {
    console.error(err);
  }
};

// Bestbuy scraping items given search input
export const massBestBuyScrape = async (input: string) => {
  try {
    // create search string
    const searchString = input.replace(" ", "+");

    // navigate to bestbuy
    return await driver.get(BESTBUY_URL + searchString).then(async () => {
      // wait for page to load
      await driver.wait(until.elementLocated(By.className(PRODUCT_LIST_IDENTIFIER)), 15000);

      return await driver
        .findElements(By.className(PRODUCT_LIST_IDENTIFIER))
        .then(async (items) => {
          // scroll page to load all items
          await scrollPage(driver, 3);

          // scrape all search results for title and price
          let results = items.map(async (item) => {
            const title = await item.findElement(By.xpath(PRODUCT_LIST_TITLE_IDENT)).getText();

            const priceText = await item.findElement(By.className(PRICE_IDENTIFIER)).getText();
            const price = +priceText.substring(1);

            const URL = await (await item.findElement(By.css(ANCHOR_TAG))).getAttribute(HREF_TAG);

            const imageElement = await item.findElement(By.xpath(SEARCH_IMAGE_SELECTOR));
            const imageURL = await imageElement.getAttribute(IMAGE_ATTRIBUTE);

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
