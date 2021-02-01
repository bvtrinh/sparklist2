import { massUniqloScrape } from "./uniqlo";
import { massAmericanEagleScrape } from "./americanEagle";
import { massMemoryExpressScrape } from "./memoryExpress";
import { massTheSourceScrape } from "./thesource";
import { massAmazonScrape } from "./amazon";
import { itemInfo } from ".";

const UNIQLO_SEARCH_URLS = [
  "https://www.uniqlo.com/ca/en/men/tops/sweaters-and-cardigans",
  "https://www.uniqlo.com/ca/en/men/outerwear/jackets",
];
const AEO_SEARCH_URLS = [
  "https://www.ae.com/ca/en/c/men/tops/shirts-flannels/cat40005?pagetype=plp",
  "https://www.ae.com/ca/en/c/men/jeans/slim-fit-jeans/cat5180058?pagetype=plp",
];
const MEMORY_EXPRESS_SEARCH_URLS = [
  "https://www.memoryexpress.com/Category/HardDrives",
  "https://www.memoryexpress.com/Category/Keyboards",
];
const SOURCE_SEARCH_URLS = [
  "https://www.thesource.ca/en-ca/audio-headphones/headphones/all-headphones/c/scc-6-1-9?categoryCode=scc-6-1-9&view=grid&page=0&sort=relevance",
  "https://www.thesource.ca/en-ca/tvs-home-theatre/televisions/all-tvs/c/scc-7-1-6?categoryCode=scc-7-1-6&view=grid&page=0&sort=relevance",
];
const AMAZON_SEARCH_URLS = [
  "https://www.amazon.ca/s?k=mouse&ref=nb_sb_noss_2",
  "https://www.amazon.ca/s?k=portable+charger&crid=20KATNGMDM3KC&sprefix=portable+ch%2Caps%2C465&ref=nb_sb_ss_ts-a-p_1_11",
];

export const testMass = async (): Promise<itemInfo[]> => {
  try {
    // const items = await massUniqloScrape(UNIQLO_SEARCH_URLS);
    // const items = await massAmericanEagleScrape(AEO_SEARCH_URLS);
    // const items = await massMemoryExpressScrape(MEMORY_EXPRESS_SEARCH_URLS);
    // const items = await massTheSourceScrape(SOURCE_SEARCH_URLS);
    const items = await massAmazonScrape(AMAZON_SEARCH_URLS);
    return items;
  } catch (err) {
    console.error(err);
    return err;
  }
};

testMass();
