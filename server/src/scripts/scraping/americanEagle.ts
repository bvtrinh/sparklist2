import { By, WebElement, until } from "selenium-webdriver";
import { makeDriver, itemInfo, scrollPage } from "./index";
import { FLOAT_REGEX, SCROLL_SCRIPT } from "../../config/constants";

const TITLE_CLASS = "product-name cms-ae-product-name";
const SALE_PRICE_CLASS = ".product-sale-price";
const LIST_PRICE_CLASS = ".product-list-price";
const IMAGE_CLASS = "picture > img";

const GRID_ITEM_CLASS = "div.product-tile.qa-product-tile";
const GRID_ITEM_TITLE_CLASS = ".tile-name > h3";
const GRID_ITEM_LIST_PRICE_CLASS = ".product-list-price";
const GRID_ITEM_SALE_PRICE_CLASS = ".product-sale-price";
const GRID_ITEM_URL_CLASS = ".product-tile.qa-product-tile > a";
const GRID_ITEM_IMAGE_URL_CLASS = ".tile-images.product-tile-image-container img";
const AD_ALERT_CLASS = 'div[data-id="modalModalAdPreferences"] button';

/**
  Given a link to an image page, return information about the item
  @return returns an itemInfo object
  @params
    url: link to a listing of an american eagle item
*/
export const americanEagleScrape = async (url: string): Promise<itemInfo> => {
  const driver = makeDriver();

  try {
    await driver.get(url);
    scrollPage(driver, 1);
    const title = await (
      await driver.wait(until.elementLocated(By.className(TITLE_CLASS)))
    ).getText();
    // const title = await (await driver.findElement(By.className(TITLE_CLASS))).getText();
    let price = +(
      await (await (await driver).findElement(By.css(LIST_PRICE_CLASS))).getText()
    ).replace(FLOAT_REGEX, "");

    const checkSalePrice = await driver.findElements(By.css(SALE_PRICE_CLASS));
    if ((await checkSalePrice.length) > 0) {
      price = +(await (await checkSalePrice[0].getText()).replace(FLOAT_REGEX, ""));
    }
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
    url: an array of links to a search result page (ex. viewing all jeans)
*/
export const massAmericanEagleScrape = async (urls: string[]): Promise<itemInfo[]> => {
  const driver = makeDriver();

  try {
    const items: itemInfo[] = [];
    for (const url of urls) {
      await driver.get(url);
      await driver.sleep(3000);
      const adPrompt = await driver.findElements(By.css(AD_ALERT_CLASS));
      if (adPrompt.length > 0) {
        await adPrompt[0].click();
      }

      await driver.executeScript(SCROLL_SCRIPT);

      const itemGrid = await driver.findElements(By.css(GRID_ITEM_CLASS));

      let title: string, price: number, itemURL: string, imageURL: string;
      let checkSalePrice: WebElement[];
      for (const item of itemGrid) {
        title = await (await item.findElement(By.css(GRID_ITEM_TITLE_CLASS))).getText();

        price = +(
          await (await (await driver).findElement(By.css(GRID_ITEM_LIST_PRICE_CLASS))).getText()
        ).replace(FLOAT_REGEX, "");
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
    }

    return items;
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    await driver.quit();
  }
};
