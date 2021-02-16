import { By } from "selenium-webdriver";
import { makeDriver, itemInfo } from "./index";
import { FLOAT_REGEX, SCROLL_SCRIPT } from "../../config/constants";

const TITLE_CLASS = "h1.pdp-name";
const PRICE_CLASS = ".pdp-sale-price";
const IMAGE_CLASS = "img.primary-image";

const GRID_ITEM_CLASS = ".productListItem";
const GRID_ITEM_TITLE_CLASS = ".head.productMainLink.desktop-only";
const GRID_ITEM_PRICE_CLASS = ".sale-price";
const GRID_ITEM_URL_CLASS = ".product-content a";
const GRID_ITEM_IMAGE_URL_CLASS = ".product-image img";

/**
  Given a link to an image page, return information about the item
  @return returns an itemInfo object
  @params
    url: link to a listing of an "The Source" item
*/
export const theSourceScrape = async (url: string): Promise<itemInfo> => {
  const driver = makeDriver();

  try {
    await driver.get(url);
    const title = driver.findElement(By.css(TITLE_CLASS)).getText();
    const price = driver.findElement(By.css(PRICE_CLASS)).getText();
    const imageURL = driver.findElement(By.css(IMAGE_CLASS)).getAttribute("src");
    const item = await Promise.all([title, price, imageURL]);

    const info: itemInfo = {
      title: item[0],
      price: +item[1].replace(FLOAT_REGEX, ""),
      itemURL: url,
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
    url: an array of links to a listing of the source items (ex. viewing all headphones)
*/
export const massTheSourceScrape = async (urls: string[]): Promise<itemInfo[]> => {
  const driver = makeDriver();

  try {
    const items: itemInfo[] = [];
    for (const url of urls) {
      await driver.get(url);
      await driver.executeScript(SCROLL_SCRIPT);
      await driver.sleep(5000);
      const itemGrid = await driver.findElements(By.css(GRID_ITEM_CLASS));

      let title: string, price: number, itemURL: string, imageURL: string;
      for (const item of itemGrid) {
        title = await (await item.findElement(By.css(GRID_ITEM_TITLE_CLASS))).getText();
        price = +(await (
          await (await item.findElement(By.css(GRID_ITEM_PRICE_CLASS))).getText()
        ).replace(FLOAT_REGEX, ""));

        itemURL = await (await item.findElement(By.css(GRID_ITEM_URL_CLASS))).getAttribute("href");
        imageURL = await (await item.findElement(By.css(GRID_ITEM_IMAGE_URL_CLASS))).getAttribute(
          "src"
        );
        items.push({ title, price, itemURL, imageURL });
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
