import { amazonScrape } from "../../scripts/scraping/amazon";
import { americanEagleScrape } from "../../scripts/scraping/americanEagle";
import { asosScrape } from "../../scripts/scraping/asos";
import { bestBuyScrape } from "../../scripts/scraping/bestbuy";
import { canadaComputersScrape } from "../../scripts/scraping/canadaComputers";
import { footlockerScrape } from "../../scripts/scraping/footlocker";
import { memoryExpressScrape } from "../../scripts/scraping/memoryExpress";
import { neweggScrape } from "../../scripts/scraping/newegg";
import { theSourceScrape } from "../../scripts/scraping/thesource";
import { uniqloScrape } from "../../scripts/scraping/uniqlo";
import { SupportedSite, TEST_URLS, TEST_VALS } from "./testConstants";
import { itemInfo } from "../../scripts/scraping";

jest.setTimeout(15000);

const testScrape = async (site: SupportedSite) => {
  let item: itemInfo = { title: "", currentPrice: 0, url: "" };
  switch (site) {
    case SupportedSite.AMAZON:
      item = await amazonScrape(TEST_URLS[site][0]);
      break;
    case SupportedSite.AEO:
      item = await americanEagleScrape(TEST_URLS[site][0]);
      break;
    case SupportedSite.ASOS:
      item = await asosScrape(TEST_URLS[site][0]);
      break;
    case SupportedSite.BESTBUY:
      item = await bestBuyScrape(TEST_URLS[site][0]);
      break;
    case SupportedSite.CANADA_COMPUTERS:
      item = await canadaComputersScrape(TEST_URLS[site][0]);
      break;
    case SupportedSite.FOOTLOCKER:
      item = await footlockerScrape(TEST_URLS[site][0]);
      break;
    case SupportedSite.MEMORY_EXPRESS:
      item = await memoryExpressScrape(TEST_URLS[site][0]);
      break;
    case SupportedSite.NEWEGG:
      item = await neweggScrape(TEST_URLS[site][0]);
      break;
    case SupportedSite.THE_SOURCE:
      item = await theSourceScrape(TEST_URLS[site][0]);
      break;
    case SupportedSite.UNIQLO:
      item = await uniqloScrape(TEST_URLS[site][0]);
      break;
  }

  expect(item.title).toBe(TEST_VALS[site][0].title);
  expect(item.currentPrice).toBeTruthy();
  expect(item.url).toBeTruthy();
  expect(item.imageURL).toBeTruthy();
};

describe("testing all 10 scraping methods", () => {
  test("amazon item scraping", async () => {
    await testScrape(SupportedSite.AMAZON);
  });
  test("american eagle item scraping", async () => {
    await testScrape(SupportedSite.AEO);
  });
  test("asos item scraping", async () => {
    await testScrape(SupportedSite.ASOS);
  });
  test("bestbuy item scraping", async () => {
    await testScrape(SupportedSite.BESTBUY);
  });
  test("canada computers item scraping", async () => {
    await testScrape(SupportedSite.CANADA_COMPUTERS);
  });
  test("footlocker item scraping", async () => {
    await testScrape(SupportedSite.FOOTLOCKER);
  });
  test("memory express item scraping", async () => {
    await testScrape(SupportedSite.MEMORY_EXPRESS);
  });
  test("newegg item scraping", async () => {
    await testScrape(SupportedSite.NEWEGG);
  });
  test("the source item scraping", async () => {
    await testScrape(SupportedSite.THE_SOURCE);
  });
  test("uniqlo item scraping", async () => {
    await testScrape(SupportedSite.UNIQLO);
  });
});
