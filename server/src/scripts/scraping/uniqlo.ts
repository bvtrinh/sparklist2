import { By } from "selenium-webdriver";
import { driver, itemInfo } from "./index";

const TITLE_CLASS = "title _10Fytm7dEFItAR1Wf2pL85";
const PRICE_CLASS = ".fr-price-currency > span";
const IMAGE_CLASS = ".fr-product-image > img";

/**
  Given a URL scrape the itemInfo from the page
  @return returns an itemInfo object
  @params
    url: link to a item page
*/
export const uniqloScrape = async (url: string) => {
  try {
    await driver.get(url);
    // TODO: add a wait for the title to appear?
    const title = await (await driver.findElement(By.className(TITLE_CLASS))).getText();
    const price = +(await (await driver.findElement(By.css(PRICE_CLASS))).getText());
    const imageURL = await (await driver.findElement(By.css(IMAGE_CLASS))).getAttribute("src");

    const info: itemInfo = { title, price, imageURL, itemURL: url };
    console.log(info);
    return info;
  } catch (err) {
    console.log(err);
    return err;
  } finally {
    await driver.quit();
  }
};

const GRID_ITEM_CLASS = ".fr-grid-item.w4";
const GRID_ITEM_TITLE_CLASS = 'p[data-test="product-card-description"]';
const GRID_ITEM_PRICE_CLASS = "span.fr-price-currency > span";
const GRID_ITEM_URL_CLASS = "a";
const GRID_ITEM_IMAGE_URL_CLASS = "div.fr-product-image > img";

/**
  Get the grid of items, go through each grid item and scrape itemInfo
  @return returns an array of itemInfo objects
  @params
    url: link to a listing of uniqlo items (ex. viewing all mens long sleeve shirts)
*/
export const massUniqloScrape = async (url: string) => {
  try {
    await driver.get(url);
    const itemGrid = await driver.findElements(By.css(GRID_ITEM_CLASS));

    let items: itemInfo[] = [];
    let title, price, itemURL, imageURL;
    for (const item of itemGrid) {
      title = await (await item.findElement(By.css(GRID_ITEM_TITLE_CLASS))).getText();
      price = +(await (await item.findElement(By.css(GRID_ITEM_PRICE_CLASS))).getText());
      itemURL = await (await item.findElement(By.css(GRID_ITEM_URL_CLASS))).getAttribute("href");
      imageURL = await (await item.findElement(By.css(GRID_ITEM_IMAGE_URL_CLASS))).getAttribute(
        "src"
      );
      items.push({ title, price, itemURL, imageURL });
    }

    console.log(items);
    return items;
  } catch (err) {
    console.log(err);
    return err;
  } finally {
    await driver.quit();
  }
};
