import { By, ThenableWebDriver, WebElement } from "selenium-webdriver";

const TITLE = "ProductName-primary";
const PRICE = "ProductPrice";
const IMAGE_SELECTOR = "//span[@class='Image Image--product Image--square']/img";
const IMAGE_ATTRIBUTE = "src";

// Footlocker scraping item given url
export const scrapeFootlockerUrl = (driver: ThenableWebDriver, URL: string) => {
  try {
    // navigate to bestbuy item page
    return driver.get(URL).then(async () => {
      const title: string = await driver.findElement(By.className(TITLE)).getText();

      const priceText: string = await driver.findElement(By.className(PRICE)).getText();
      const price: number = +priceText.substring(1);

      const imageElement: WebElement = await driver.findElement(By.xpath(IMAGE_SELECTOR));
      const imageURL: string = await imageElement.getAttribute(IMAGE_ATTRIBUTE);

      return { title, price, URL, imageURL };
    });
  } catch (err) {
    console.error(err);
  }
};
