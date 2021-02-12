import { body } from "express-validator";
import { MIN_LEN } from "../config/constants";
import { itemInfo } from "../scripts/scraping/index";

// url whitelist for supported sites
const urlOptions = {
  host_whitelist: [
    "www.amazon.ca",
    "www.ae.ca",
    "www.asos.com",
    "www.bestbuy.ca",
    "www.canadacomputers.com",
    "www.footlocker.ca",
    "www.memoryexpress.com",
    "www.newegg.ca",
    "www.walmart.ca",
    "www.uniqlo.com",
  ],
};

export const itemURLValidation = [
  body("url", "Unsupported site").exists().isURL(urlOptions).isLength({ min: MIN_LEN }),
];

export const validateItemData = (itemData: itemInfo | undefined) => {
  if (!itemData) return false;
  if (itemData.title.length === 0 || !itemData.currentPrice) {
    return false;
  }
  return true;
};
