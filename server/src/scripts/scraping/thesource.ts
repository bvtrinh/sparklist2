import { By } from "selenium-webdriver";
import { driver, itemInfo } from "./index";
import { FLOAT_REGEX } from "../../config/constants";

const GRID_ITEM_CLASS = ".productListItem";
const GRID_ITEM_TITLE_CLASS = ".head.productMainLink.desktop-only";
const GRID_ITEM_PRICE_CLASS = ".sale-price";
const GRID_ITEM_URL_CLASS = ".product-content a";
const GRID_ITEM_IMAGE_URL_CLASS = ".product-image img";

/**
  Get the grid of items, go through each grid item and scrape itemInfo
  @return returns an array of itemInfo objects
  @params
    url: link to a listing of the source items (ex. viewing all mens long sleeve shirts)
*/
export const massTheSourceScrape = async (url: string) => {
  try {
    await driver.get(url);
    await driver.executeScript(
      'window.scrollBy({top:document.body.scrollHeight, left: 0, behaviour: "smooth"})'
    );
    await (await driver).sleep(5000);
    const itemGrid = await driver.findElements(By.css(GRID_ITEM_CLASS));

    let items: itemInfo[] = [];
    let title, price, itemURL, imageURL;
    for (const item of itemGrid) {
      title = await (await item.findElement(By.css(GRID_ITEM_TITLE_CLASS))).getText();
      price = +(await (
        await (await item.findElement(By.css(GRID_ITEM_PRICE_CLASS))).getAttribute("aria-label")
      ).replace(FLOAT_REGEX, ""));
      itemURL = await (await item.findElement(By.css(GRID_ITEM_URL_CLASS))).getAttribute("href");
      imageURL = await (await item.findElement(By.css(GRID_ITEM_IMAGE_URL_CLASS))).getAttribute(
        "src"
      );
      items.push({ title, price, itemURL, imageURL });
    }

    console.log(items);
    return items;
  } catch (err) {
    console.log(err);
    return err;
  } finally {
    await driver.quit();
  }
};
