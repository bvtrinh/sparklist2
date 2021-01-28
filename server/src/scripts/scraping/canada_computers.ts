import { By, ThenableWebDriver } from "selenium-webdriver";

const TITLE_IDENTIFIER = "h3 mb-0";
const PRICE_IDENTIFIER = "h2-big";
const IMAGE_SELECTOR = "slick-image";
const IMAGE_ATTRIBUTE = "src";

// Nestbuy scraping item given url
export const scrapeCanadaComputersUrl = (driver: ThenableWebDriver, URL: string) => {
  try {
    // navigate to Newegg item page
    return driver.get(URL).then(async () => {
      const title: string = await driver.findElement(By.className(TITLE_IDENTIFIER)).getText();
      const priceText: string = await driver.findElement(By.className(PRICE_IDENTIFIER)).getText();
      const price: number = +priceText.substring(1);

      const imageElement = await driver.findElement(By.className(IMAGE_SELECTOR));
      const imageURL = await imageElement.getAttribute(IMAGE_ATTRIBUTE);

      return { title, price, URL, imageURL };
    });
  } catch (err) {
    console.error(err);
  }
};
