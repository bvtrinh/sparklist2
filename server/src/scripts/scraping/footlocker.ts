import { By, until } from "selenium-webdriver";
import { makeDriver, itemInfo, scrollPage } from "./index";

const FOOTLOCKER_URL = "https://www.footlocker.ca/en/search?query=";
const TITLE = "ProductName-primary";
const PRICE = "ProductPrice";
const PRICE_FINAL = "ProductPrice-final";
const SEARCH_RESULTS = "SearchResults";
const SEARCH_LIST = "ProductCard";
const IMAGE_SELECTOR = "//span[@class='Image Image--product Image--square']/img";

/**
  Given a link to an image page, return information about the item
  @return returns an itemInfo object
  @params
    url: link to a listing of an Footlocker item
*/
export const footlockerScrape = async (url: string) => {
  const driver = makeDriver();

  try {
    // navigate to bestbuy item page
    await driver.get(url);
    const title = await (await driver.findElement(By.className(TITLE))).getText();

    const priceText = await (await driver.findElement(By.className(PRICE))).getText();
    const price = +priceText.substring(1);

    const imageElement = await driver.findElement(By.xpath(IMAGE_SELECTOR));
    const imageURL = await imageElement.getAttribute("src");

    const info: itemInfo = { title, price, itemURL: url, imageURL };
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
    input: a search query for items on Footlocker
*/
export const massFootlockerScrape = async (input: string) => {
  const driver = makeDriver();

  //create search query string
  const searchQuery = input.replace(" ", "%20");

  try {
    // navigate to footlocker
    await driver.get(FOOTLOCKER_URL + searchQuery);
    // wait for page to load
    await driver.wait(until.elementLocated(By.className(SEARCH_RESULTS)), 10000);
    await scrollPage(driver, 2);

    const searchResults = await driver.findElements(By.className(SEARCH_LIST));
    const items: itemInfo[] = [];
    // scrape all search results for title and price
    for (const item of searchResults) {
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
