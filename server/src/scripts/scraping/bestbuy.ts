import { By, until } from "selenium-webdriver";
import { makeDriver, itemInfo, scrollPage } from "./index";

const BESTBUY_URL = "https://www.bestbuy.ca/en-ca/search?search=";
const TITLE_IDENTIFIER = "h1";
const PRICE_IDENTIFIER = "screenReaderOnly_3anTj";
const PRODUCT_LIST_IDENTIFIER = "x-productListItem";
const PRODUCT_LIST_TITLE_IDENT = ".//div[@data-automation='productItemName']";
const IMAGE_SELECTOR = "//img[@class='productImage_1NbKv']";
const SEARCH_IMAGE_SELECTOR = ".//img[@class='productItemImage_1en8J']";

/**
  Given a link to an image page, return information about the item
  @return returns an itemInfo object
  @params
    url: link to a listing of an Bestbuy item
*/
export const bestBuyScrape = async (url: string): Promise<itemInfo> => {
  const driver = makeDriver();

  try {
    // navigate to bestbuy item page
    await driver.get(url);
    const title = driver.wait(until.elementLocated(By.css(TITLE_IDENTIFIER))).getText();
    const price = driver.wait(until.elementLocated(By.className(PRICE_IDENTIFIER))).getText();
    const imageURL = driver
      .wait(until.elementLocated(By.xpath(IMAGE_SELECTOR)))
      .getAttribute("src");
    const item = await Promise.all([title, price, imageURL]);

    const info: itemInfo = {
      title: item[0],
      currentPrice: +item[1].substring(1),
      url: url,
      imageURL: item[2],
    };
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
    input: a search query for items on BestBuy
*/
export const massBestBuyScrape = async (input: string): Promise<itemInfo[]> => {
  const driver = makeDriver();

  try {
    // create search string
    const searchString = input.replace(" ", "+");

    // navigate to bestbuy
    await driver.get(BESTBUY_URL + searchString);
    // wait for page to load
    await driver.wait(until.elementLocated(By.className(PRODUCT_LIST_IDENTIFIER)), 15000);

    // scroll page to load all items
    await scrollPage(driver, 3);

    const searchResults = await driver.findElements(By.className(PRODUCT_LIST_IDENTIFIER));

    // scrape all search results for title and price
    const items: itemInfo[] = [];

    for (const item of searchResults) {
      const title = await (await item.findElement(By.xpath(PRODUCT_LIST_TITLE_IDENT))).getText();

      const priceText = await (await item.findElement(By.className(PRICE_IDENTIFIER))).getText();
      const price = +priceText.substring(1);

      const itemURL = await (await item.findElement(By.css("a"))).getAttribute("href");

      const imageElement = await item.findElement(By.xpath(SEARCH_IMAGE_SELECTOR));
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
