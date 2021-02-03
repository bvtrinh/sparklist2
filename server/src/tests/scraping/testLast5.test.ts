import { uniqloScrape } from "../../scripts/scraping/uniqlo";
import { americanEagleScrape } from "../../scripts/scraping/americanEagle";
import { memoryExpressScrape } from "../../scripts/scraping/memoryExpress";
import { walmartScrape } from "../../scripts/scraping/walmart";
import { amazonScrape } from "../../scripts/scraping/amazon";
import { SupportedSite, TEST_URLS, TEST_VALS } from "./testConstants";
import { itemInfo } from "../../scripts/scraping";

jest.setTimeout(10000);

const testScrape = async (site: SupportedSite) => {
  let item: itemInfo;
  switch (site) {
    case SupportedSite.AMAZON:
      item = await amazonScrape(TEST_URLS[site][0]);
      break;
    case SupportedSite.AEO:
      item = await americanEagleScrape(TEST_URLS[site][0]);
      break;
    case SupportedSite.MEMORY_EXPRESS:
      item = await memoryExpressScrape(TEST_URLS[site][0]);
      break;
    case SupportedSite.WALMART:
      item = await walmartScrape(TEST_URLS[site][0]);
      break;
    case SupportedSite.UNIQLO:
      item = await uniqloScrape(TEST_URLS[site][0]);
      break;
  }

  expect(item.title).toBe(TEST_VALS[site][0].title);
  expect(item.price).toBeTruthy();
  expect(item.itemURL).toBeTruthy();
  expect(item.imageURL).toBeTruthy();
};

describe("testing last 5 scraping websites", () => {
  test("amazon item scraping", async () => {
    await testScrape(SupportedSite.AMAZON);
  });
  test("american eagle item scraping", async () => {
    await testScrape(SupportedSite.AEO);
  });
  test("memory express item scraping", async () => {
    await testScrape(SupportedSite.MEMORY_EXPRESS);
  });
  test("walmart item scraping", async () => {
    await testScrape(SupportedSite.WALMART);
  });
  test("uniqlo item scraping", async () => {
    await testScrape(SupportedSite.UNIQLO);
  });
});
