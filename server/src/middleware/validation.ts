import { body } from "express-validator";
import { MIN_LEN } from "../config/constants";

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
