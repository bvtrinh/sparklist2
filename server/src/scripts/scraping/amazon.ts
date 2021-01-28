import { By } from "selenium-webdriver";
import { driver, itemInfo } from "./index";
import { FLOAT_REGEX } from "../../config/constants";

const TITLE_CLASS = "#productTitle";
const LIST_PRICE_CLASS = "span#priceblock_ourprice";
const SALE_PRICE_CLASS = "span#priceblock_dealprice";
const IMAGE_CLASS = "#imgTagWrapperId > img";

/**
  Given a link to an image page, return information about the item
  @return returns an itemInfo object
  @params
    url: link to a listing of an amazon item
*/
export const amazonScrape = async (url: string) => {
  try {
    await driver.get(url);
    // TODO: add a wait for the title to appear?
    const title = await await (await driver.findElement(By.css(TITLE_CLASS))).getText();

    let price = 0;
    const checkSalePrice = await driver.findElements(By.css(SALE_PRICE_CLASS));
    if ((await checkSalePrice.length) > 0) {
      price = +(await (await checkSalePrice[0].getText()).replace(FLOAT_REGEX, ""));
    } else {
      price = +(await (
        await (await (await driver).findElement(By.css(LIST_PRICE_CLASS))).getText()
      ).replace(FLOAT_REGEX, ""));
    }

    const imageURL = await (await driver.findElement(By.css(IMAGE_CLASS))).getAttribute("src");

    const info: itemInfo = { title, price, imageURL, itemURL: url };
    console.log(info);
    return info;
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    await driver.quit();
  }
};

const GRID_ITEM_CLASS = 'div[data-component-type="s-search-result"]';
const GRID_ITEM_TITLE_CLASS = "h2.a-size-mini span";
const GRID_ITEM_PRICE_WHOLE_CLASS = ".a-price-whole";
const GRID_ITEM_PRICE_FRACTION_CLASS = ".a-price-fraction";
const GRID_ITEM_URL_CLASS = "h2.a-size-mini > a";
const GRID_ITEM_IMAGE_URL_CLASS = 'img[data-image-latency="s-product-image"]';

/**
  Get the grid of items, go through each grid item and scrape itemInfo
  @return returns an array of itemInfo objects
  @params
    url: link to a listing of amazon items (ex. viewing search results)
*/
export const massAmazonScrape = async (url: string) => {
  try {
    await driver.get(url);
    await (await driver).sleep(2000);
    await driver.executeScript(
      'window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });'
    );
    const itemGrid = await driver.findElements(By.css(GRID_ITEM_CLASS));

    let items: itemInfo[] = [];
    let title, priceWhole, priceFraction, price, itemURL, imageURL;
    let checkPriceWhole;

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

      items.push({ title, price, itemURL, imageURL });
    }

    console.log(items);
    return items;
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    await driver.quit();
  }
};
