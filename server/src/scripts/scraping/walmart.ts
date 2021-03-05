import { By, until } from "selenium-webdriver";
import { makeDriver, itemInfo } from "./index";
import { FLOAT_REGEX } from "../../config/constants";

const TITLE_CLASS = 'h1[data-automation="product-title"]';
const PRICE_CLASS = 'span[data-automation="buybox-price"]';
const IMAGE_CLASS = "#main-image";

/**
  Given a link to an image page, return information about the item
  @return returns an itemInfo object
  @params
    url: link to a listing of an walmart item
*/
export const walmartScrape = async (url: string): Promise<itemInfo> => {
  const driver = makeDriver();

  try {
    await driver.get(url);
    const title = await driver.wait(until.elementLocated(By.css(TITLE_CLASS))).getText();
    const price = +(await driver.wait(until.elementLocated(By.css(PRICE_CLASS))).getText()).replace(
      FLOAT_REGEX,
      ""
    );
    const imageURL = await driver
      .wait(until.elementLocated(By.css(IMAGE_CLASS)))
      .getAttribute("src");

    const info: itemInfo = { title, currentPrice: price, url, imageURL };
    return info;
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    await driver.quit();
  }
};
