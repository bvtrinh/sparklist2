import { uniqloScrape } from "../../scripts/scraping/uniqlo";
import { americanEagleScrape } from "../../scripts/scraping/americanEagle";
import { memoryExpressScrape } from "../../scripts/scraping/memoryExpress";
import { walmartScrape } from "../../scripts/scraping/walmart";
import { amazonScrape } from "../../scripts/scraping/amazon";

const UNIQLO_URLS = ["https://www.uniqlo.com/ca/en/products/E433399-000?colorCode=COL00"];
const AEO_URLS = [
  "https://www.ae.com/ca/en/p/men/hoodies-sweatshirts/sweater-hoodies/ae-super-soft-hooded-sweater/1149_1670_613?nvid=pdp%3A1149_1670_613",
  "https://www.ae.com/ca/en/p/men/slim-fit-jeans/slim-jeans/ae-airflex-slim-jean/0117_5347_938?isFiltered=false&nvid=plp%3Acat370027&menu=cat4840004",
];
const MEM_EXPRESS_URLS = [
  "https://www.memoryexpress.com/Products/MX70319",
  "https://www.memoryexpress.com/Products/MX00113042",
];
const WALAMRT_URLS = [
  "https://www.walmart.ca/en/ip/blue-microphones-yeti-usb-microphone-blackout-edition/PRD6ELCF922S7Z9?rrid=richrelevance",
  "https://www.walmart.ca/en/ip/keurig-k-mini-single-serve-coffee-maker-black/6000198453943?rrid=richrelevance",
];
const AMAZON_URLS = [
  "https://www.amazon.ca/Magnetic-Machine-Sunny-Health-Fitness/dp/B017HSNIEW/ref=gbps_img_s-6_c86a_f43c3ed9?smid=A3DWYIK6Y9EEQB&pf_rd_p=956ef016-d330-404d-888d-d50717e0c86a&pf_rd_s=slot-6&pf_rd_t=701&pf_rd_i=gb_main&pf_rd_m=A3DWYIK6Y9EEQB&pf_rd_r=6DSTGBJX1Z5N1ERE98QD",
  "https://www.amazon.ca/Stick-All-New-Remote-streaming-player/dp/B079QH9GG7/ref=zg_bs_electronics_home_1?_encoding=UTF8&psc=1&refRID=W1S4SN2X5A0JNZE98G02",
];

const testPages = async () => {
  const item = await uniqloScrape(UNIQLO_URLS[0]);
  // const item = await americanEagleScrape(AEO_URLS[1]);
  // const item = await memoryExpressScrape(MEM_EXPRESS_URLS[1]);
  // const item = await walmartScrape(WALAMRT_URLS[1]);
  // const item = await amazonScrape(AMAZON_URLS[0]);
};
testPages();
