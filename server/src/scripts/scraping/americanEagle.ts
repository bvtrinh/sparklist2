import { By } from "selenium-webdriver";
import { driver, itemInfo } from "./index";
import { FLOAT_REGEX } from "../../config/constants";

const TITLE_CLASS = "product-name cms-ae-product-name";
const SALE_PRICE_CLASS = ".product-sale-price";
const LIST_PRICE_CLASS = ".product-list-price";
const IMAGE_CLASS = "picture > img";

export const americanEagleScrape = async (url: string) => {
  try {
    await driver.get(url);
    // TODO: add a wait for the title to appear?
    const title = await (await driver.findElement(By.className(TITLE_CLASS))).getText();
    let price = +(await (
      await (await (await driver).findElement(By.css(LIST_PRICE_CLASS))).getText()
    ).replace(FLOAT_REGEX, ""));

    const checkSalePrice = await driver.findElements(By.css(SALE_PRICE_CLASS));
    if ((await checkSalePrice.length) > 0) {
      price = +(await (await checkSalePrice[0].getText()).replace(FLOAT_REGEX, ""));
    }
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

const GRID_ITEM_CLASS = "div.product-tile.qa-product-tile";
const GRID_ITEM_TITLE_CLASS = ".tile-name > h3";
const GRID_ITEM_LIST_PRICE_CLASS = ".product-list-price";
const GRID_ITEM_SALE_PRICE_CLASS = ".product-sale-price";
const GRID_ITEM_URL_CLASS = ".product-tile.qa-product-tile > a";
const GRID_ITEM_IMAGE_URL_CLASS = ".tile-images.product-tile-image-container img";

const AD_ALERT_CLASS = 'button[data-tl="btn-accept"]';

/**
  Get the grid of items, go through each grid item and scrape itemInfo
  @return returns an array of itemInfo objects
  @params
    url: link to a search result page
*/
export const massAmericanEagleScrape = async (url: string) => {
  try {
    await driver.get(url);
    await (await driver).sleep(2000);
    await (await (await driver).findElement(By.css(AD_ALERT_CLASS))).click();

    await driver.executeScript(
      'window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });'
    );

    const itemGrid = await driver.findElements(By.css(GRID_ITEM_CLASS));
    console.log(itemGrid.length);

    let items: itemInfo[] = [];
    let title, price, itemURL, imageURL;
    let checkSalePrice;
    for (const item of itemGrid) {
      title = await (await item.findElement(By.css(GRID_ITEM_TITLE_CLASS))).getText();

      price = +(await (
        await (await (await driver).findElement(By.css(GRID_ITEM_LIST_PRICE_CLASS))).getText()
      ).replace(FLOAT_REGEX, ""));
      checkSalePrice = await driver.findElements(By.css(GRID_ITEM_SALE_PRICE_CLASS));
      if ((await checkSalePrice.length) > 0) {
        price = +(await (await checkSalePrice[0].getText()).replace(FLOAT_REGEX, ""));
      }

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
