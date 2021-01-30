import { driver } from "./index";
import { bestBuyScrape, massBestBuyScrape } from "./bestbuy";
import { canadaComputersScrape, massCanadaComputersScrape } from "./canadaComputers";
import { footlockerScrape, massFootlockerScrape } from "./footlocker";
import { neweggScrape, massNeweggScrape } from "./newegg";
import { asosScrape, massAsosScrape } from "./asos";

export const runScrapingTests = async () => {
  // const result = await bestBuyScrape("https://www.bestbuy.ca/en-ca/product/14777258");
  // const result = await massBestBuyScrape("android phone");

  // const result = await footlockerScrape(
  //   "https://www.footlocker.ca/en/product/jordan-retro-5-mens/4100636.html"
  // );
  // const result = await massFootlockerScrape("nike hoodie");

  // const result = await neweggScrape(
  //   "https://www.newegg.ca/tp-link-archer-a6-ieee-802-11ac-n-a-5-ghz-ieee-802-11b-g-n-2-4-ghz/p/N82E16833704463"
  // );
  // const result = await massNeweggScrape("wireless mouse");

  // const result = await canadaComputersScrape(
  //   "https://www.canadacomputers.com/product_info.php?cPath=4_64_1969&item_id=158362&sid=alucpev14n2km0avn3t9k4ags6"
  // );
  // const result = await massCanadaComputersScrape("amd cpu");

  // const result = await asosScrape(
  //   "https://www.asos.com/us/nike/nike-revival-hoodie-in-pale-purple/prd/21642747?colourwayid=60183785&SearchQuery=nike%20hoodie"
  // );
  const result = await massAsosScrape("nike hoodie");

  console.log(result);
  (await driver).quit();
};

runScrapingTests();
