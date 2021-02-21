import { amazonScrape } from "../scripts/scraping/amazon";
import { americanEagleScrape } from "../scripts/scraping/americanEagle";
import { asosScrape } from "../scripts/scraping/asos";
import { bestBuyScrape } from "../scripts/scraping/bestbuy";
import { canadaComputersScrape } from "../scripts/scraping/canadaComputers";
import { footlockerScrape } from "../scripts/scraping/footlocker";
import { memoryExpressScrape } from "../scripts/scraping/memoryExpress";
import { neweggScrape } from "../scripts/scraping/newegg";
import { uniqloScrape } from "../scripts/scraping/uniqlo";
import { walmartScrape } from "../scripts/scraping/walmart";

export enum SupportedURLs {
  AMAZON = "www.amazon.ca",
  AEO = "www.ae.ca",
  ASOS = "www.asos.com",
  BESTBUY = "www.bestbuy.ca",
  CANADA_COMPUTERS = "www.canadacomputers.com",
  FOOTLOCKER = "www.footlocker.ca",
  MEMORY_EXPRESS = "www.memoryexpress.com",
  NEWEGG = "www.newegg.ca",
  WALMART = "www.walmart.ca",
  UNIQLO = "www.uniqlo.com",
}

export const scrapeURL = async (url: string) => {
  const site = url.replace("https://", "").split("/")[0];

  switch (site) {
    case SupportedURLs.AMAZON:
      return await amazonScrape(url);
    case SupportedURLs.AEO:
      return await americanEagleScrape(url);
    case SupportedURLs.ASOS:
      return await asosScrape(url);
    case SupportedURLs.BESTBUY:
      return await bestBuyScrape(url);
    case SupportedURLs.CANADA_COMPUTERS:
      return await canadaComputersScrape(url);
    case SupportedURLs.FOOTLOCKER:
      return await footlockerScrape(url);
    case SupportedURLs.MEMORY_EXPRESS:
      return await memoryExpressScrape(url);
    case SupportedURLs.NEWEGG:
      return await neweggScrape(url);
    case SupportedURLs.WALMART:
      return await walmartScrape(url);
    case SupportedURLs.UNIQLO:
      return await uniqloScrape(url);
  }
};
