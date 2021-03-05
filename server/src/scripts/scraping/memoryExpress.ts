import { By, until } from "selenium-webdriver";
import { makeDriver, itemInfo } from "./index";
import { LINE_BREAK_REGEX, FLOAT_REGEX, SCROLL_SCRIPT } from "../../config/constants";

const TITLE_CLASS = "header h1";
const PRICE_CLASS = ".GrandTotal.c-capr-pricing__grand-total > div";
const IMAGE_CLASS = ".c-capr-images__focus > img";

const GRID_ITEM_CLASS = ".c-shca-icon-item";
const GRID_ITEM_TITLE_CLASS = ".c-shca-icon-item__body-name > a";
const GRID_ITEM_PRICE_CLASS = ".c-shca-icon-item__summary-list > span";
const GRID_ITEM_URL_CLASS = ".c-shca-icon-item__body-image > a";
const GRID_ITEM_IMAGE_URL_CLASS = ".c-shca-icon-item__body-image a > img";

/**
  Given a link to an image page, return information about the item
  @return returns an itemInfo object
  @params
    url: link to a listing of an memory express item
*/
export const memoryExpressScrape = async (url: string): Promise<itemInfo> => {
  const driver = makeDriver();

  try {
    await driver.get(url);
    const title = driver.wait(until.elementLocated(By.css(TITLE_CLASS))).getText();
    const price = driver.wait(until.elementLocated(By.css(PRICE_CLASS))).getText();
    const imageURL = driver.wait(until.elementLocated(By.css(IMAGE_CLASS))).getAttribute("src");
    const item = await Promise.all([title, price, imageURL]);

    const info: itemInfo = {
      title: item[0].replace(LINE_BREAK_REGEX, ""),
      currentPrice: +item[1].replace(FLOAT_REGEX, ""),
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
  Get the grid of items, go through each grid item and scrape itemInfo
  @return returns an array of itemInfo objects
  @params
    url: link to a listing of memory express items (ex. viewing memory hard drives)
*/
export const massMemoryExpressScrape = async (urls: string[]): Promise<itemInfo[]> => {
  const driver = makeDriver();

  try {
    const items: itemInfo[] = [];
    for (const url of urls) {
      await driver.get(url);
      await driver.executeScript(SCROLL_SCRIPT);
      const itemGrid = await driver.findElements(By.css(GRID_ITEM_CLASS));

      let title: string, price: number, itemURL: string, imageURL: string;
      for (const item of itemGrid) {
        title = await (
          await (await item.findElement(By.css(GRID_ITEM_TITLE_CLASS))).getText()
        ).replace(LINE_BREAK_REGEX, "");

        price = +(await (
          await (await item.findElement(By.css(GRID_ITEM_PRICE_CLASS))).getText()
        ).replace(FLOAT_REGEX, ""));

        itemURL = await (await item.findElement(By.css(GRID_ITEM_URL_CLASS))).getAttribute("href");

        imageURL = await (await item.findElement(By.css(GRID_ITEM_IMAGE_URL_CLASS))).getAttribute(
          "src"
        );

        items.push({ title, currentPrice: price, url: itemURL, imageURL });
      }
    }

    return items;
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    await driver.quit();
  }
};
