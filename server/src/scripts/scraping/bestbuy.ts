import { By, ThenableWebDriver, WebElement } from "selenium-webdriver";

const TITLE_IDENTIFIER = "h1";
const PRICE_IDENTIFIER = "screenReaderOnly_3anTj";
const IMAGE_SELECTOR = "//img[@class='productImage_1NbKv']";
const IMAGE_ATTRIBUTE = "src";

// Bestbuy scraping item given url
export const scrapeBestBuyURL = (driver: ThenableWebDriver, URL: string) => {
  try {
    // navigate to bestbuy item page
    return driver.get(URL).then(async () => {
      const title: string = await driver.findElement(By.css(TITLE_IDENTIFIER)).getText();

      const priceText: string = await driver.findElement(By.className(PRICE_IDENTIFIER)).getText();
      const price: number = +priceText.substring(1);

      const imageElement: WebElement = await driver.findElement(By.xpath(IMAGE_SELECTOR));
      const imageURL: string = await imageElement.getAttribute(IMAGE_ATTRIBUTE);

      return { title, price, URL: URL, imageURL };
    });
  } catch (err) {
    console.error(err);
  }
};
