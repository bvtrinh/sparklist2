import { By, until, WebElement } from "selenium-webdriver";
import { makeDriver, itemInfo } from "./index";
import { FLOAT_REGEX, SCROLL_SCRIPT } from "../../config/constants";

const TITLE_CLASS = "#productTitle";
const LIST_PRICE_CLASS = "span#priceblock_ourprice";
const SALE_PRICE_CLASS = "span#priceblock_dealprice";
const IMAGE_CLASS = "#imgTagWrapperId > img";

const GRID_ITEM_CLASS = 'div[data-component-type="s-search-result"]';
const GRID_ITEM_TITLE_CLASS = "h2.a-size-mini span";
const GRID_ITEM_PRICE_WHOLE_CLASS = ".a-price-whole";
const GRID_ITEM_PRICE_FRACTION_CLASS = ".a-price-fraction";
const GRID_ITEM_URL_CLASS = "h2.a-size-mini > a";
const GRID_ITEM_IMAGE_URL_CLASS = 'img[data-image-latency="s-product-image"]';

/**
  Given a link to an image page, return information about the item
  @return returns an itemInfo object
  @params
    url: link to a listing of an amazon item
*/
export const amazonScrape = async (url: string): Promise<itemInfo> => {
  const driver = makeDriver();
  try {
    await driver.get(url);

    const title = driver.wait(until.elementLocated(By.css(TITLE_CLASS))).getText();
    const price = await driver.wait(until.elementLocated(By.css(LIST_PRICE_CLASS))).getText();
    const imageURL = driver.wait(until.elementLocated(By.css(IMAGE_CLASS))).getAttribute("src");
    const checkSalePrice = driver.findElements(By.css(SALE_PRICE_CLASS));
    const item = await Promise.all([title, price, imageURL, checkSalePrice]);

    if (item[3].length > 0) item[1] = await item[3][0].getText();

    const info: itemInfo = {
      title: item[0],
      currentPrice: +item[1].replace(FLOAT_REGEX, ""),
      imageURL: item[2],
      url: url,
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
    url: an array of links to a listing of amazon items (ex. viewing search results)
*/
export const massAmazonScrape = async (urls: string[]): Promise<itemInfo[]> => {
  const driver = makeDriver();
  try {
    const items: itemInfo[] = [];
    for (const url of urls) {
      await driver.get(url);
      await driver.sleep(2000);
      await driver.executeScript(SCROLL_SCRIPT);
      const itemGrid = await driver.findElements(By.css(GRID_ITEM_CLASS));

      let title: string,
        priceWhole: string,
        priceFraction: string,
        price: number,
        itemURL: string,
        imageURL: string;
      let checkPriceWhole: WebElement[];

      for (const item of itemGrid) {
        title = await (await item.findElement(By.css(GRID_ITEM_TITLE_CLASS))).getText();

        checkPriceWhole = await item.findElements(By.css(GRID_ITEM_PRICE_WHOLE_CLASS));

        if ((await checkPriceWhole.length) <= 0) continue;

        priceWhole = await checkPriceWhole[0].getText();
        priceFraction = await (
          await item.findElement(By.css(GRID_ITEM_PRICE_FRACTION_CLASS))
        ).getText();
        price = +`${priceWhole}.${priceFraction}`;

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
