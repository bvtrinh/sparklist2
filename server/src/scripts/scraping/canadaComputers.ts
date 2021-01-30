import { By, Key, ThenableWebDriver, until } from "selenium-webdriver";

const CANADA_COMPUTERS_URL =
  "https://www.canadacomputers.com/search/results_details.php?language=en&keywords=";
const TITLE_IDENTIFIER = "h3 mb-0";
const PRICE_IDENTIFIER = "h2-big";
const SEARCH_IDENTIFIER = "cc_quick_search";
const PRODUCT_LIST_IDENTIFIER = "product-list";
const RESULTS_LIST_IDENTIFIER = "toggleBox";
const RESULTS_TITLE_IDENTIFIER = "productTemplate_title";
const RESULTS_PRICE_INDENTIFIER = "pq-hdr-product_price";
const IMAGE_TAG = "img";
const IMAGE_SELECTOR = "slick-image";
const IMAGE_ATTRIBUTE = "src";
const ANCHOR_TAG = "a";
const HREF_TAG = "href";

// Nestbuy scraping item given url
export const scrapeCanadaComputersUrl = (driver: ThenableWebDriver, URL: string) => {
  try {
    // navigate to Newegg item page
    return driver.get(URL).then(async () => {
      const title = await driver.findElement(By.className(TITLE_IDENTIFIER)).getText();
      const priceText = await driver.findElement(By.className(PRICE_IDENTIFIER)).getText();
      const price = +priceText.substring(1);

      const imageElement = await driver.findElement(By.className(IMAGE_SELECTOR));
      const imageURL = await imageElement.getAttribute(IMAGE_ATTRIBUTE);

      return { title, price, URL, imageURL };
    });
  } catch (err) {
    console.error(err);
  }
};

export const scrapeCanadaComputersSearch = async (driver: ThenableWebDriver, input: string) => {
  //create search query string
  const searchQuery = input.replace(" ", "+");

  try {
    // navigate to Newegg
    return await driver.get(CANADA_COMPUTERS_URL + searchQuery).then(async () => {
      // search for user inputted keyword
      await driver.findElement(By.id(SEARCH_IDENTIFIER)).sendKeys(input);
      await driver.findElement(By.id(SEARCH_IDENTIFIER)).sendKeys(Key.ENTER);

      // wait for page to load
      await driver.wait(until.elementLocated(By.id(PRODUCT_LIST_IDENTIFIER)), 5000);

      return await driver
        .findElements(By.className(RESULTS_LIST_IDENTIFIER))
        .then(async (items) => {
          // scrape all search results for title and price
          let results = items.map(async (item) => {
            const title = await item.findElement(By.className(RESULTS_TITLE_IDENTIFIER)).getText();

            const priceText = await item
              .findElement(By.className(RESULTS_PRICE_INDENTIFIER))
              .getText();
            const price = +priceText.split(" ")[0].substring(1).replace(",", "");

            const URL = await (await item.findElement(By.css(ANCHOR_TAG))).getAttribute(HREF_TAG);

            const imageElement = await item.findElement(By.css(IMAGE_TAG));
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
