import { By } from "selenium-webdriver";
import { driver, itemInfo } from "./index";

const FLOAT_REGEX = /[^\d.-]/g;
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
