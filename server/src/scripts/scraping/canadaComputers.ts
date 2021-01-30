import { By, Key, until } from "selenium-webdriver";
import { driver, itemInfo } from "./index";

const CANADA_COMPUTERS_URL =
  "https://www.canadacomputers.com/search/results_details.php?language=en&keywords=";
const TITLE_IDENTIFIER = "h3 mb-0";
const PRICE_IDENTIFIER = "h2-big";
const SEARCH_IDENTIFIER = "cc_quick_search";
const PRODUCT_LIST_IDENTIFIER = "product-list";
const RESULTS_LIST_IDENTIFIER = "toggleBox";
const RESULTS_TITLE_IDENTIFIER = "productTemplate_title";
const RESULTS_PRICE_INDENTIFIER = "pq-hdr-product_price";
const IMAGE_SELECTOR = "slick-image";

// Nestbuy scraping item given url
export const canadaComputersScrape = (url: string) => {
  try {
    // navigate to Newegg item page
    return driver.get(url).then(async () => {
      const title = await (
        await (await driver).findElement(By.className(TITLE_IDENTIFIER))
      ).getText();
      const priceText = await (
        await (await driver).findElement(By.className(PRICE_IDENTIFIER))
      ).getText();
      const price = +priceText.substring(1);

      const imageElement = await (await driver).findElement(By.className(IMAGE_SELECTOR));
      const imageURL = await imageElement.getAttribute("src");

      const info: itemInfo = { title, price, itemURL: url, imageURL };
      return info;
    });
  } catch (err) {
    console.error(err);
  }
};

export const massCanadaComputersScrape = async (input: string) => {
  //create search query string
  const searchQuery = input.replace(" ", "+");

  try {
    // navigate to Newegg)
    return await driver.get(CANADA_COMPUTERS_URL + searchQuery).then(async () => {
      // wait for page to load
      await driver.wait(until.elementLocated(By.id(PRODUCT_LIST_IDENTIFIER)), 5000);
      return await (await driver)
        .findElements(By.className(RESULTS_LIST_IDENTIFIER))
        .then(async (items) => {
          // scrape all search results for title and price
          let results = items.map(async (item) => {
            const title = await (
              await item.findElement(By.className(RESULTS_TITLE_IDENTIFIER))
            ).getText();

            const priceText = await (
              await item.findElement(By.className(RESULTS_PRICE_INDENTIFIER))
            ).getText();
            const price = +priceText.split(" ")[0].substring(1).replace(",", "");

            const URL = await (await item.findElement(By.css("a"))).getAttribute("href");

            const imageElement = await item.findElement(By.css("img"));
            const imageURL = await imageElement.getAttribute("src");

            const info: itemInfo = { title, price, itemURL: URL, imageURL };
            return info;
          });

          return Promise.all(results);
        });
    });
  } catch (err) {
    console.error(err);
  }
};
