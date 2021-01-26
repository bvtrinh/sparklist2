import { uniqloScrape, massUniqloScrape } from "./uniqlo";
import { americanEagleScrape } from "./americanEagle";
import { memoryExpressScrape } from "./memoryExpress";
import { walmartScrape } from "./walmart";
import { amazonScrape } from "./amazon";

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

// const WALAMRT_URLS = [
//   "https://www.walmart.ca/en/ip/blue-microphones-yeti-usb-microphone-blackout-edition/PRD6ELCF922S7Z9?rrid=richrelevance",
//   "https://www.walmart.ca/en/ip/keurig-k-mini-single-serve-coffee-maker-black/6000198453943?rrid=richrelevance",
// ];
// walmartScrape(WALAMRT_URLS[1]);

// const AMAZON_URLS = [
//   "https://www.amazon.ca/Magnetic-Machine-Sunny-Health-Fitness/dp/B017HSNIEW/ref=gbps_img_s-6_c86a_f43c3ed9?smid=A3DWYIK6Y9EEQB&pf_rd_p=956ef016-d330-404d-888d-d50717e0c86a&pf_rd_s=slot-6&pf_rd_t=701&pf_rd_i=gb_main&pf_rd_m=A3DWYIK6Y9EEQB&pf_rd_r=6DSTGBJX1Z5N1ERE98QD",
//   "https://www.amazon.ca/gp/product/B07R7DH6VF?pf_rd_r=15JD86ZAJS3HXT0KTK6X&pf_rd_p=05326fd5-c43e-4948-99b1-a65b129fdd73",
// ];

// amazonScrape(AMAZON_URLS[1]);

/* SEARCH RESULTS SCRAPING */

const UNIQLO_SEARCH_URLS = ["https://www.uniqlo.com/ca/en/men/tops/sweaters-and-cardigans"];
massUniqloScrape(UNIQLO_SEARCH_URLS[0]);
