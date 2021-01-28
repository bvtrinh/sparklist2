import { By, ThenableWebDriver, until, WebElement } from "selenium-webdriver";

const FOOTLOCKER_URL = "https://www2.hm.com/en_ca/search-results.html?q=";
const TITLE = "h1";
const PRICE = "price";
const SEARCH_RESULTS = "product-item";
const SEARCH_TITLE = "item-heading";
const SEARCH_PRICE = "item-price";
const SEARCH_SALE_PRICE = "price sale";
const ANCHOR_TAG = "a";
const HREF_TAG = "href";

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

export const scrapeHMSearch = async (driver: ThenableWebDriver, input: string) => {
  // create search query string
  const searchQuery = input.replace(" ", "+");

  try {
    // navigate to footlocker
    return await driver.get(FOOTLOCKER_URL + searchQuery).then(async () => {
      return await driver
        .findElements(By.className(SEARCH_RESULTS))
        .then(async (items: WebElement[]) => {
          // scrape all search results for title and price
          let results = items.map(async (item: WebElement) => {
            const title: string = await item.findElement(By.className(SEARCH_TITLE)).getText();

            let priceText: string;
            try {
              priceText = await item.findElement(By.className(SEARCH_SALE_PRICE)).getText();
            } catch {
              priceText = await item.findElement(By.className(SEARCH_PRICE)).getText();
            }
            const price: number = +priceText.substring(1);

            const URL: string = await (await item.findElement(By.css(ANCHOR_TAG))).getAttribute(
              HREF_TAG
            );

            return { title, price, URL };
          });

          return Promise.all(results);
        });
    });
  } catch (err) {
    console.error(err);
  }
};
