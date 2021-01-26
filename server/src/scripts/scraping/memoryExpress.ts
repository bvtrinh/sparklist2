import { By } from "selenium-webdriver";
import { driver, itemInfo } from "./index";
import { LINE_BREAK_REGEX, FLOAT_REGEX } from "../../config/constants";

const TITLE_CLASS = "header h1";
const PRICE_CLASS = ".GrandTotal.c-capr-pricing__grand-total > div";
const IMAGE_CLASS = ".c-capr-images__focus > img";

export const memoryExpressScrape = async (url: string) => {
  try {
    await driver.get(url);
    // TODO: add a wait for the title to appear?
    const title = await (await (await driver.findElement(By.css(TITLE_CLASS))).getText()).replace(
      LINE_BREAK_REGEX,
      " "
    );
    const price = +(await (await (await driver.findElement(By.css(PRICE_CLASS))).getText()).replace(
      FLOAT_REGEX,
      ""
    ));

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
