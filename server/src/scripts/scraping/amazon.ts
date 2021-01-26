import { By } from "selenium-webdriver";
import { driver, itemInfo } from "./index";
import { FLOAT_REGEX } from "../../config/constants";

const TITLE_CLASS = "#productTitle";
const LIST_PRICE_CLASS = "span#priceblock_ourprice";
const SALE_PRICE_CLASS = "span#priceblock_dealprice";
const IMAGE_CLASS = "#imgTagWrapperId > img";

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
    console.log(err);
    return err;
  } finally {
    await driver.quit();
  }
};
