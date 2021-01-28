import { By } from "selenium-webdriver";
import { driver, itemInfo } from "./index";
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
export const walmartScrape = async (url: string) => {
  try {
    await driver.get(url);
    // TODO: add a wait for the title to appear?
    const title = await await (await driver.findElement(By.css(TITLE_CLASS))).getText();
    const price = +(await (await (await driver.findElement(By.css(PRICE_CLASS))).getText()).replace(
      FLOAT_REGEX,
      ""
    ));
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
