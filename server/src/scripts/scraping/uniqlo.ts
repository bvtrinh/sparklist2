import { By } from "selenium-webdriver";
import { makeDriver, itemInfo } from "./index";

const TITLE_CLASS = "title _10Fytm7dEFItAR1Wf2pL85";
const PRICE_CLASS = ".fr-price-currency > span";
const IMAGE_CLASS = ".fr-product-image > img";

const GRID_ITEM_CLASS = ".fr-grid-item.w4";
const GRID_ITEM_TITLE_CLASS = 'p[data-test="product-card-description"]';
const GRID_ITEM_PRICE_CLASS = "span.fr-price-currency > span";
const GRID_ITEM_URL_CLASS = "a";
const GRID_ITEM_IMAGE_URL_CLASS = "div.fr-product-image > img";

/**
  Given a link to an image page, return information about the item
  @return returns an itemInfo object
  @params
    url: link to a listing of an uniqlo item
*/
export const uniqloScrape = async (url: string): Promise<itemInfo> => {
  const driver = makeDriver();

  try {
    await driver.get(url);
    const title = driver.findElement(By.className(TITLE_CLASS)).getText();
    const price = driver.findElement(By.css(PRICE_CLASS)).getText();
    const imageURL = driver.findElement(By.css(IMAGE_CLASS)).getAttribute("src");
    const item = await Promise.all([title, price, imageURL]);

    const info: itemInfo = {
      title: item[0],
      currentPrice: +item[1],
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
    url: an array of links to a listing of uniqlo items (ex. viewing all mens long sleeve shirts)
*/
export const massUniqloScrape = async (urls: string[]): Promise<itemInfo[]> => {
  const driver = makeDriver();

  try {
    const items: itemInfo[] = [];
    for (const url of urls) {
      await driver.get(url);
      const itemGrid = await driver.findElements(By.css(GRID_ITEM_CLASS));

      let title: string, price: number, itemURL: string, imageURL: string;
      for (const item of itemGrid) {
        title = await (await item.findElement(By.css(GRID_ITEM_TITLE_CLASS))).getText();
        price = +(await (await item.findElement(By.css(GRID_ITEM_PRICE_CLASS))).getText());
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
