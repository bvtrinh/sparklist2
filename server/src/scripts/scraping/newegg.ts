import { By, ThenableWebDriver } from "selenium-webdriver";

const TITLE = "h1";
const PRICE = "price-current";
const IMAGE_SELECTOR = "product-view-img-original";
const IMAGE_ATTRIBUTE = "src";

// Newegg scraping item given url
export const scrapeNeweggUrl = (driver: ThenableWebDriver, URL: string) => {
  try {
    // navigate to Newegg item page
    return driver.get(URL).then(async () => {
      const title: string = await driver.findElement(By.css(TITLE)).getText();

      const priceText: string = await driver.findElement(By.className(PRICE)).getText();
      const price: number = +priceText.substring(1);

      const imageElement = await driver.findElement(By.className(IMAGE_SELECTOR));
      const imageURL = await imageElement.getAttribute(IMAGE_ATTRIBUTE);

      return { title, price, URL, imageURL };
    });
  } catch (err) {
    console.error(err);
  }
};
