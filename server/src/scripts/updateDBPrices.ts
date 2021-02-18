import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../../.env.development") });
import { connect, disconnect } from "../models/connect";
import { Item, IItem } from "../models/item.model";
import { scrapeURL } from "../middleware/scraping";
import { validateItemData } from "../middleware/validation";

export const updateItem = async () => {
  // connect to db
  connect(false);

  // Get all items in DB
  try {
    const items = await Item.find();
    if (!items) {
      // ID does not exist
      throw new Error("No items in database");
    }

    for (let i = 0; i < items.length; i++) {
      // scrape for updated info
      const itemData = await scrapeURL(items[i].url);

      if (itemData) {
        // validate scraped data
        if (!validateItemData(itemData)) {
          throw new Error("Item data not valid");
        }

        // update item with new data
        items[i].title = itemData.title;
        items[i].currentPrice = itemData.currentPrice;
        items[i].imageURL = itemData.imageURL;
        items[i].modifyDate = new Date();
        items[i].priceHistory.push({
          price: itemData.currentPrice,
          date: new Date(),
        });

        // Update on DB
        await items[i].save();
        console.log(`Updated: ${items[i].title}`);
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    disconnect();
  }
};

updateItem();
