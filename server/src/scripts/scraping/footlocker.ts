import { By, ThenableWebDriver, until, WebElement } from "selenium-webdriver";

const FOOTLOCKER_URL = "https://www.footlocker.ca/en/search?query=";
const TITLE = "ProductName-primary";
const PRICE = "ProductPrice";
const PRICE_FINAL = "ProductPrice-final";
const SEARCH_RESULTS = "SearchResults";
const SEARCH_LIST = "ProductCard";
const IMAGE_SELECTOR = "//span[@class='Image Image--product Image--square']/img";
const IMAGE_TAG = "img";
const IMAGE_ATTRIBUTE = "src";
const ANCHOR_TAG = "a";
const HREF_TAG = "href";

const scrollPage = async (driver: ThenableWebDriver) => {
  for (let i = 0; i < 2; i++) {
    await driver.executeScript(`window.scrollBy({
      top: 2500,
      left: 0,
      behavior: "smooth",
    })`);
    await driver.sleep(1000);
  }
};

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

export const scrapeFootlockerSearch = async (driver: ThenableWebDriver, input: string) => {
  //create search query string
  const searchQuery = input.replace(" ", "%20");

  try {
    // navigate to footlocker
    return await driver.get(FOOTLOCKER_URL + searchQuery).then(async () => {
      // wait for page to load
      await driver.wait(until.elementLocated(By.className(SEARCH_RESULTS)), 10000);
      await scrollPage(driver);

      return await driver
        .findElements(By.className(SEARCH_LIST))
        .then(async (items: WebElement[]) => {
          // scrape all search results for title and price
          let results = items.map(async (item: WebElement) => {
            const title: string = await item.findElement(By.className(TITLE)).getText();

            let priceText: string;
            // look for sale price, otherwise get regular price
            try {
              priceText = await item.findElement(By.className(PRICE_FINAL)).getText();
            } catch (err) {
              priceText = await item.findElement(By.className(PRICE)).getText();
            }

            const URL: string = await item.findElement(By.css(ANCHOR_TAG)).getAttribute(HREF_TAG);

            const imageElement = item.findElement(By.css(IMAGE_TAG));
            const imageURL = await imageElement.getAttribute(IMAGE_ATTRIBUTE);

            const price: number = +priceText.substring(1);
            return { title, price, URL, imageURL };
          });

          return Promise.all(results);
        });
    });
  } catch (err) {
    console.error(err);
  }
};
