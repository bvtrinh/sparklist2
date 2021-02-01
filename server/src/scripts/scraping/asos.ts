import { By } from "selenium-webdriver";
import { makeDriver, itemInfo, scrollPage } from "./index";

const ASOS_URL = "https://www.asos.com/us/search/?q=";
const TITLE = "h1";
const PRICE = "//span[@data-id='current-price']";
const IMAGE_TAG = "gallery-image";
const SEARCH_RESULTS = "//article[@data-auto-id='productTile']";
const SEARCH_TITLE = ".//div[@data-auto-id='productTileDescription']";
const SEARCH_PRICE = ".//span[@data-auto-id='productTilePrice']";
const SEARCH_SALE_PRICE = ".//span[@data-auto-id='productTileSaleAmount']";
const SEARCH_IMAGE = ".//img[@data-auto-id='productTileImage']";

/**
  Given a link to an image page, return information about the item
  @return returns an itemInfo object
  @params
    url: link to a listing of an Asos item
*/
export const asosScrape = async (url: string) => {
  const driver = makeDriver();

  try {
    // navigate to bestbuy item page
    return driver.get(url).then(async () => {
      const title = await (await (await driver).findElement(By.css(TITLE))).getText();

      const priceText = await (await (await driver).findElement(By.xpath(PRICE))).getText();
      const price = +priceText.substring(2);

      const imageURL = await (
        await (await driver).findElement(By.className(IMAGE_TAG))
      ).getAttribute("src");

      const info: itemInfo = { title, price, itemURL: url, imageURL };
      return info;
    });
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    await driver.quit();
  }
};

/**
  Get the search result of items, go through each item and scrape itemInfo
  @return returns an array of itemInfo objects
  @params
    input: a search query for items on Asos
*/
export const massAsosScrape = async (input: string) => {
  const driver = makeDriver();

  // create search query string
  const searchQuery = input.replace(" ", "+");

  try {
    // navigate to ASOS
    return await (await driver).get(ASOS_URL + searchQuery).then(async () => {
      return await (await driver).findElements(By.xpath(SEARCH_RESULTS)).then(async (items) => {
        // scrape all search results for title and price
        let results = items.map(async (item) => {
          // scroll page to load images
          await scrollPage(driver, 3);

          const title = await (await item.findElement(By.xpath(SEARCH_TITLE))).getText();

          let priceText: string;
          try {
            priceText = await (await item.findElement(By.xpath(SEARCH_SALE_PRICE))).getText();
          } catch {
            priceText = await (await item.findElement(By.xpath(SEARCH_PRICE))).getText();
          }
          const price = +priceText.substring(2);

          const URL = await (await item.findElement(By.css("a"))).getAttribute("href");

          const imageURL = await (await item.findElement(By.xpath(SEARCH_IMAGE))).getAttribute(
            "src"
          );

          const info: itemInfo = { title, price, itemURL: URL, imageURL };
          return info;
        });

        return Promise.all(results);
      });
    });
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    await driver.quit();
  }
};
