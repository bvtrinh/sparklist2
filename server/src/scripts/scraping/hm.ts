import { By, ThenableWebDriver } from "selenium-webdriver";

const TITLE = "h1";
const PRICE = "price";

// Bestbuy scraping item given url
export const scrapeHMUrl = (driver: ThenableWebDriver, URL: string) => {
  try {
    // navigate to bestbuy item page
    return driver.get(URL).then(async () => {
      const title: string = await driver.findElement(By.css(TITLE)).getText();
      const priceText: string = await driver.findElement(By.className(PRICE)).getText();
      const price: number = +priceText.substring(1);

      return { title, price, URL };
    });
  } catch (err) {
    console.error(err);
  }
};
