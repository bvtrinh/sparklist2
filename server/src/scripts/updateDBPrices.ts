import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../../.env.development") });
import { connect, disconnect } from "../models/connect";
import { Item, IItem } from "../models/item.model";
import { scrapeURL } from "../middleware/scraping";
import { validateItemData } from "../middleware/validation";

export const updateItem = async () => {
  console.log("updating item");

  const itemID = "602499bf88b9e256e860fb12";
  // connect to db
  connect(false);

  // Find the Item in DB
  try {
    const item = await Item.findById(itemID);
    if (!item) {
      // ID does not exist
      throw new Error("ID does not exist");
    }

    // scrape for updated info
    const itemData = await scrapeURL(item.url);

    if (itemData) {
      // validate scraped data
      if (!validateItemData(itemData)) {
        throw new Error("Item data not valid");
      }

      // update item with new data
      item.title = itemData.title;
      item.currentPrice = itemData.currentPrice;
      item.imageURL = itemData.imageURL;
      item.modifyDate = new Date();
      item.priceHistory.push({
        price: itemData.currentPrice,
        date: new Date(),
      });

      // Update on DB
      await Item.updateOne({ _id: itemID }, item);
      console.log("Item updated on db");
    }
  } catch (err) {
    console.log(err);
  } finally {
    disconnect();
  }
};

updateItem();
