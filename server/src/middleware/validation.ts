import { body } from "express-validator";
import { MIN_LEN } from "../config/constants";
import { Wishlist } from "../models/wishlist.model";
import { itemInfo } from "../scripts/scraping/index";
import { SupportedURLs } from "./scraping";

// url whitelist for supported sites
const urlOptions = {
  host_whitelist: [
    SupportedURLs.AMAZON,
    SupportedURLs.AEO,
    SupportedURLs.ASOS,
    SupportedURLs.BESTBUY,
    SupportedURLs.CANADA_COMPUTERS,
    SupportedURLs.FOOTLOCKER,
    SupportedURLs.MEMORY_EXPRESS,
    SupportedURLs.NEWEGG,
    SupportedURLs.WALMART,
    SupportedURLs.UNIQLO,
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

export const validateWishlistName = async (wishlistData: any) => {
  let wishlists = [];
  try {
    wishlists = await Wishlist.find({ owner: wishlistData.owner });
  } catch (err) {
    console.log(err);
  }

  for (let wishlist of wishlists) {
    if (wishlist.name === wishlistData.name) {
      return false;
    }
  }
  return true;
};
