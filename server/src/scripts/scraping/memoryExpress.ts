import { By, until } from "selenium-webdriver";
import { driver, itemInfo } from "./index";
import { LINE_BREAK_REGEX, FLOAT_REGEX } from "../../config/constants";

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
export const memoryExpressScrape = async (url: string) => {
  try {
    await driver.get(url);
    // TODO: add a wait for the title to appear?
    const title = await (await (await driver.findElement(By.css(TITLE_CLASS))).getText()).replace(
      LINE_BREAK_REGEX,
      " "
    );
    const price = +(await (await (await driver.findElement(By.css(PRICE_CLASS))).getText()).replace(
      FLOAT_REGEX,
      ""
    ));

    const imageURL = await (await driver.findElement(By.css(IMAGE_CLASS))).getAttribute("src");

    const info: itemInfo = { title, price, imageURL, itemURL: url };
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
export const massMemoryExpressScrape = async (url: string) => {
  try {
    await driver.get(url);
    await driver.executeScript(
      'window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });'
    );
    const itemGrid = await driver.findElements(By.css(GRID_ITEM_CLASS));

    let items: itemInfo[] = [];
    let title, price, itemURL, imageURL;
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

      items.push({ title, price, itemURL, imageURL });
    }

    return items;
  } catch (err) {
    console.log(err);
    return err;
  } finally {
    await driver.quit();
  }
};
