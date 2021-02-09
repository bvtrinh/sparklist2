import { By } from "selenium-webdriver";
import { makeDriver, itemInfo } from "./index";

const NEWEGG_URL = "https://www.newegg.ca/p/pl?d=";
const TITLE = "h1";
const PRICE = "price-current";
const SEARCH_RESULTS = "item-cell";
const RESULT_TITLE = "item-title";
const RESULT_PRICE = "price-current";
const IMAGE_SELECTOR = "product-view-img-original";

/**
  Given a link to an image page, return information about the item
  @return returns an itemInfo object
  @params
    url: link to a listing of an Newegg item
*/
export const neweggScrape = async (url: string): Promise<itemInfo> => {
  const driver = makeDriver();

  try {
    // navigate to Newegg item page
    await driver.get(url);
    const title = await (await driver.findElement(By.css(TITLE))).getText();

    const priceText = await (await driver.findElement(By.className(PRICE))).getText();
    const price = +priceText.substring(1);

    const imageElement = await driver.findElement(By.className(IMAGE_SELECTOR));
    const imageURL = await imageElement.getAttribute("src");

    const info: itemInfo = { title, currentPrice: price, url, imageURL };
    return info;
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
    input: a search query for items on Newegg
*/
export const massNeweggScrape = async (input: string): Promise<itemInfo[]> => {
  const driver = makeDriver();

  //create search query string
  const searchQuery = input.replace(" ", "+");

  try {
    // navigate to Newegg
    await driver.get(NEWEGG_URL + searchQuery);
    const searchResults = await driver.findElements(By.className(SEARCH_RESULTS));

    const items: itemInfo[] = [];
    // scrape all search results for title and price
    for (const item of searchResults) {
      const title = await (await item.findElement(By.className(RESULT_TITLE))).getText();

      const priceText = await (await item.findElement(By.className(RESULT_PRICE))).getText();
      const price = +priceText.split(" ")[0].substring(1);

      const itemURL = await (await item.findElement(By.css("a"))).getAttribute("href");

      const imageElement = await item.findElement(By.css("img"));
      const imageURL = await imageElement.getAttribute("src");

      const info: itemInfo = { title, currentPrice: price, url: itemURL, imageURL };
      items.push(info);
    }

    return items;
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    await driver.quit();
  }
};
