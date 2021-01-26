import { By } from "selenium-webdriver";
import { driver, itemInfo } from "./index";

const TITLE_CLASS = "title _10Fytm7dEFItAR1Wf2pL85";
const PRICE_CLASS = ".fr-price-currency > span";
const IMAGE_CLASS = ".fr-product-image > img";

export const uniqloScrape = async (url: string) => {
  try {
    await driver.get(url);
    // TODO: add a wait for the title to appear?
    const title = await (await driver.findElement(By.className(TITLE_CLASS))).getText();
    const price = +(await (await driver.findElement(By.css(PRICE_CLASS))).getText());
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
