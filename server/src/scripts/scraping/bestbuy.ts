import { By, ThenableWebDriver, until, WebElement } from "selenium-webdriver";

const BESTBUY_URL = "https://www.bestbuy.ca/en-ca/search?search=";
const TITLE_IDENTIFIER = "h1";
const PRICE_IDENTIFIER = "screenReaderOnly_3anTj";
const PRODUCT_LIST_IDENTIFIER = "x-productListItem";
const PRODUCT_LIST_TITLE_IDENT = ".//div[@data-automation='productItemName']";
const IMAGE_SELECTOR = "//img[@class='productImage_1NbKv']";
const SEARCH_IMAGE_SELECTOR = ".//img[@class='productItemImage_1en8J']";
const IMAGE_ATTRIBUTE = "src";
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

// Bestbuy scraping items given search input
export const scrapeBestBuySearch = async (driver: ThenableWebDriver, input: string) => {
  try {
    // create search string
    const searchString = input.replace(" ", "+");

    // navigate to bestbuy
    return await driver.get(BESTBUY_URL + searchString).then(async () => {
      // wait for page to load
      await driver.wait(until.elementLocated(By.className(PRODUCT_LIST_IDENTIFIER)), 15000);

      return await driver
        .findElements(By.className(PRODUCT_LIST_IDENTIFIER))
        .then(async (items: WebElement[]) => {
          // scroll page to load all items
          await scrollPage(driver);

          // scrape all search results for title and price
          let results = items.map(async (item: WebElement) => {
            const title: string = await item
              .findElement(By.xpath(PRODUCT_LIST_TITLE_IDENT))
              .getText();

            const priceText: string = await item
              .findElement(By.className(PRICE_IDENTIFIER))
              .getText();
            const price: number = +priceText.substring(1);

            const URL: string = await (await item.findElement(By.css(ANCHOR_TAG))).getAttribute(
              HREF_TAG
            );

            const imageElement = await item.findElement(By.xpath(SEARCH_IMAGE_SELECTOR));
            const imageURL = await imageElement.getAttribute(IMAGE_ATTRIBUTE);

            return { title, price, URL, imageURL };
          });

          return Promise.all(results);
        });
    });
  } catch (err) {
    console.error(err);
  }
};
