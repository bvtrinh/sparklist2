import { By } from "selenium-webdriver";
import { driver, itemInfo } from "./index";

const NEWEGG_URL = "https://www.newegg.ca/p/pl?d=";
const TITLE = "h1";
const PRICE = "price-current";
const SEARCH_RESULTS = "item-cell";
const RESULT_TITLE = "item-title";
const RESULT_PRICE = "price-current";
const IMAGE_SELECTOR = "product-view-img-original";
const IMAGE_TAG = "img";
const IMAGE_ATTRIBUTE = "src";
const ANCHOR_TAG = "a";
const HREF_TAG = "href";

// Newegg scraping item given url
export const neweggScrape = (url: string) => {
  try {
    // navigate to Newegg item page
    return driver.get(url).then(async () => {
      const title = await driver.findElement(By.css(TITLE)).getText();

      const priceText = await driver.findElement(By.className(PRICE)).getText();
      const price = +priceText.substring(1);

      const imageElement = await driver.findElement(By.className(IMAGE_SELECTOR));
      const imageURL = await imageElement.getAttribute(IMAGE_ATTRIBUTE);

      const info: itemInfo = { title, price, itemURL: url, imageURL };
      return info;
    });
  } catch (err) {
    console.error(err);
  }
};

export const massNeweggScrape = async (input: string) => {
  //create search query string
  const searchQuery = input.replace(" ", "+");

  try {
    // navigate to Newegg
    return await driver.get(NEWEGG_URL + searchQuery).then(async () => {
      return await driver.findElements(By.className(SEARCH_RESULTS)).then(async (items) => {
        // scrape all search results for title and price
        let results = items.map(async (item) => {
          const title = await item.findElement(By.className(RESULT_TITLE)).getText();

          const priceText = await item.findElement(By.className(RESULT_PRICE)).getText();
          const price = +priceText.split(" ")[0].substring(1);

          const URL = await (await item.findElement(By.css(ANCHOR_TAG))).getAttribute(HREF_TAG);

          const imageElement = await item.findElement(By.css(IMAGE_TAG));
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
