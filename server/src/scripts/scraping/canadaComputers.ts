import { By, until } from "selenium-webdriver";
import { makeDriver, itemInfo } from "./index";

const CANADA_COMPUTERS_URL =
  "https://www.canadacomputers.com/search/results_details.php?language=en&keywords=";
const TITLE_IDENTIFIER = "h3 mb-0";
const PRICE_IDENTIFIER = "h2-big";
const PRODUCT_LIST_IDENTIFIER = "product-list";
const RESULTS_LIST_IDENTIFIER = "toggleBox";
const RESULTS_TITLE_IDENTIFIER = "productTemplate_title";
const RESULTS_PRICE_INDENTIFIER = "pq-hdr-product_price";
const IMAGE_SELECTOR = "slick-image";

/**
  Given a link to an image page, return information about the item
  @return returns an itemInfo object
  @params
    url: link to a listing of an Canada Computers item
*/
export const canadaComputersScrape = async (url: string): Promise<itemInfo> => {
  const driver = makeDriver();

  try {
    // navigate to Canada Computers item page
    await driver.get(url);
    await driver.sleep(3000);

    const title = driver.wait(until.elementLocated(By.className(TITLE_IDENTIFIER))).getText();
    const price = driver.wait(until.elementLocated(By.className(PRICE_IDENTIFIER))).getText();
    const imageURL = driver
      .wait(until.elementLocated(By.className(IMAGE_SELECTOR)))
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
    input: a search query for items on Canada Computers
*/
export const massCanadaComputersScrape = async (input: string): Promise<itemInfo[]> => {
  const driver = makeDriver();

  //create search query string
  const searchQuery = input.replace(" ", "+");

  try {
    // navigate to Canada Computers
    await driver.get(CANADA_COMPUTERS_URL + searchQuery);
    // wait for page to load
    await driver.wait(until.elementLocated(By.id(PRODUCT_LIST_IDENTIFIER)), 5000);
    const searchResults = await driver.findElements(By.className(RESULTS_LIST_IDENTIFIER));

    // scrape all search results for title and price
    const items: itemInfo[] = [];
    for (const item of searchResults) {
      const title = await (
        await item.findElement(By.className(RESULTS_TITLE_IDENTIFIER))
      ).getText();

      const priceText = await (
        await item.findElement(By.className(RESULTS_PRICE_INDENTIFIER))
      ).getText();
      const price = +priceText.split(" ")[0].substring(1).replace(",", "");

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
