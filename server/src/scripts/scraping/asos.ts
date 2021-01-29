import { By, ThenableWebDriver, until, WebElement } from "selenium-webdriver";

const ASOS_URL = "https://www.asos.com/us/search/?q=";
const TITLE = "h1";
const PRICE = "//span[@data-id='current-price']";
const IMAGE_TAG = "gallery-image";
const SRC = "src";
const SEARCH_RESULTS = "//article[@data-auto-id='productTile']";
const SEARCH_TITLE = ".//div[@data-auto-id='productTileDescription']";
const SEARCH_PRICE = ".//span[@data-auto-id='productTilePrice']";
const SEARCH_SALE_PRICE = ".//span[@data-auto-id='productTileSaleAmount']";
const SEARCH_IMAGE = ".//img[@data-auto-id='productTileImage']";
const ANCHOR_TAG = "a";
const HREF_TAG = "href";

const scrollPage = async (driver: ThenableWebDriver) => {
  for (let i = 0; i < 3; i++) {
    await driver.executeScript(`window.scrollBy({
        top: 2500,
        left: 0,
        behavior: "smooth",
      })`);
    await driver.sleep(1000);
  }
};

// ASOS scraping item given url
export const scrapeAsosUrl = (driver: ThenableWebDriver, URL: string) => {
  try {
    // navigate to bestbuy item page
    return driver.get(URL).then(async () => {
      const title: string = await driver.findElement(By.css(TITLE)).getText();

      const priceText: string = await driver.findElement(By.xpath(PRICE)).getText();
      const price: number = +priceText.substring(2);

      const imageURL: string = await driver.findElement(By.className(IMAGE_TAG)).getAttribute(SRC);

      return { title, price, imageURL, URL };
    });
  } catch (err) {
    console.error(err);
  }
};

export const scrapeAsosSearch = async (driver: ThenableWebDriver, input: string) => {
  // create search query string
  const searchQuery = input.replace(" ", "+");

  try {
    // navigate to ASOS
    return await driver.get(ASOS_URL + searchQuery).then(async () => {
      return await driver
        .findElements(By.xpath(SEARCH_RESULTS))
        .then(async (items: WebElement[]) => {
          // scrape all search results for title and price
          let results = items.map(async (item: WebElement) => {
            // scroll page to load images
            scrollPage(driver);

            const title: string = await item.findElement(By.xpath(SEARCH_TITLE)).getText();

            let priceText: string;
            try {
              priceText = await item.findElement(By.xpath(SEARCH_SALE_PRICE)).getText();
            } catch {
              priceText = await item.findElement(By.xpath(SEARCH_PRICE)).getText();
            }
            const price: number = +priceText.substring(2);

            const URL: string = await item.findElement(By.css(ANCHOR_TAG)).getAttribute(HREF_TAG);

            const imageURL: string = await item
              .findElement(By.xpath(SEARCH_IMAGE))
              .getAttribute("src");

            return { title, price, URL, imageURL };
          });

          return Promise.all(results);
        });
    });
  } catch (err) {
    console.error(err);
  }
};
