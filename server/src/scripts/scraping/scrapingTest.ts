import { Builder, Capabilities } from "selenium-webdriver";
import "chromedriver";

import { scrapeBestBuyURL, scrapeBestBuySearch } from "./bestbuy";
import { scrapeCanadaComputersUrl, scrapeCanadaComputersSearch } from "./canada_computers";
import { scrapeFootlockerUrl, scrapeFootlockerSearch } from "./footlocker";
import { scrapeNeweggSearch, scrapeNeweggUrl } from "./newegg";
import { scrapeHMSearch, scrapeHMUrl } from "./hm";
import { scrapeAsosSearch, scrapeAsosUrl } from "./asos";

// Set up the browser capabilities.
var browserCapabilities = Capabilities.chrome();
browserCapabilities.set("goog:chromeOptions", {
  args: ["--window-size=1900,1200"],
});

var driver = new Builder().forBrowser("chrome").withCapabilities(browserCapabilities).build();

export const runScrapingTests = async () => {
  // const result = await scrapeBestBuyURL(driver, "https://www.bestbuy.ca/en-ca/product/14777258");
  // const result = await scrapeBestBuySearch(driver, "android phone");

  // const result = await scrapeFootlockerUrl(
  //   driver,
  //   "https://www.footlocker.ca/en/product/jordan-retro-5-mens/4100636.html"
  // );
  // const result = await scrapeFootlockerSearch(driver, "nike hoodie");

  // const result = await scrapeNeweggUrl(
  //   driver,
  //   "https://www.newegg.ca/tp-link-archer-a6-ieee-802-11ac-n-a-5-ghz-ieee-802-11b-g-n-2-4-ghz/p/N82E16833704463"
  // );
  // const result = await scrapeNeweggSearch(driver, "wireless mouse");

  // const result = await scrapeCanadaComputersUrl(
  //   driver,
  //   "https://www.canadacomputers.com/product_info.php?cPath=4_64_1969&item_id=158362&sid=alucpev14n2km0avn3t9k4ags6"
  // );
  // const result = await scrapeCanadaComputersSearch(driver, "amd cpu");

  // const result = await scrapeHMUrl(driver, "https://www2.hm.com/en_ca/productpage.0685813042.html");
  //   const result = await scrapeHMSearch(driver, "mens hoodie");

  const result = await scrapeAsosUrl(
    driver,
    "https://www.asos.com/us/nike/nike-revival-hoodie-in-pale-purple/prd/21642747?colourwayid=60183785&SearchQuery=nike%20hoodie"
  );
  // const result = await scrapeAsosSearch(driver, "nike hoodie");

  console.log(result);
  driver.quit();
};
