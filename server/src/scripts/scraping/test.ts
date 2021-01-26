import { uniqloScrape } from "./uniqlo";
import { americanEagleScrape } from "./americanEagle";
import { memoryExpressScrape } from "./memoryExpress";
import { walmartScrape } from "./walmart";

// const UNIQLO_URLS = ["https://www.uniqlo.com/ca/en/products/E433399-000?colorCode=COL00"];
// uniqloScrape(UNIQLO_URLS[0]);

// const AEO_URLS = [
//   "https://www.ae.com/ca/en/p/men/hoodies-sweatshirts/sweater-hoodies/ae-super-soft-hooded-sweater/1149_1670_613?nvid=pdp%3A1149_1670_613",
//   "https://www.ae.com/ca/en/p/men/slim-fit-jeans/slim-jeans/ae-airflex-slim-jean/0117_5347_938?isFiltered=false&nvid=plp%3Acat370027&menu=cat4840004",
// ];
// americanEagleScrape(AEO_URLS[1]);

// const MEM_EXPRESS_URLS = [
//   "https://www.memoryexpress.com/Products/MX70319",
//   "https://www.memoryexpress.com/Products/MX00113042",
// ];

// memoryExpressScrape(MEM_EXPRESS_URLS[1]);

const WALAMRT_URLS = [
  "https://www.walmart.ca/en/ip/blue-microphones-yeti-usb-microphone-blackout-edition/PRD6ELCF922S7Z9?rrid=richrelevance",
  "https://www.walmart.ca/en/ip/keurig-k-mini-single-serve-coffee-maker-black/6000198453943?rrid=richrelevance",
];

walmartScrape(WALAMRT_URLS[1]);
