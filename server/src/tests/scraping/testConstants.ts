// File contains testing item page URLS and values

export enum SupportedSite {
  AMAZON = "AMAZON",
  AEO = "AEO",
  ASOS = "ASOS",
  BESTBUY = "BESTBUY",
  CANADA_COMPUTERS = "CANADA_COMPUTERS",
  FOOTLOCKER = "FOOTLOCKER",
  MEMORY_EXPRESS = "MEMORY_EXPRESS",
  NEWEGG = "NEWEGG",
  WALMART = "WALMART",
  UNIQLO = "UNIQLO",
}

type SupportedSiteMap<T> = {
  [key in keyof typeof SupportedSite]: T;
};

type TestableValues = {
  title: string;
};

export const TEST_URLS: SupportedSiteMap<string[]> = {
  AMAZON: [
    "https://www.amazon.ca/Magnetic-Machine-Sunny-Health-Fitness/dp/B017HSNIEW/ref=gbps_img_s-6_c86a_f43c3ed9?smid=A3DWYIK6Y9EEQB&pf_rd_p=956ef016-d330-404d-888d-d50717e0c86a&pf_rd_s=slot-6&pf_rd_t=701&pf_rd_i=gb_main&pf_rd_m=A3DWYIK6Y9EEQB&pf_rd_r=6DSTGBJX1Z5N1ERE98QD",
    "https://www.amazon.ca/Stick-All-New-Remote-streaming-player/dp/B079QH9GG7/ref=zg_bs_electronics_home_1?_encoding=UTF8&psc=1&refRID=W1S4SN2X5A0JNZE98G02",
  ],
  AEO: [
    "https://www.ae.com/ca/en/p/men/hoodies-sweatshirts/sweater-hoodies/ae-super-soft-hooded-sweater/1149_1670_613?nvid=pdp%3A1149_1670_613",
    "https://www.ae.com/ca/en/p/men/slim-fit-jeans/slim-jeans/ae-airflex-slim-jean/0117_5347_938?isFiltered=false&nvid=plp%3Acat370027&menu=cat4840004",
  ],
  ASOS: [
    "https://www.asos.com/us/nike/nike-revival-hoodie-in-pale-purple/prd/21642747",
    "https://www.asos.com/us/asos-design/asos-design-overshirt-in-wool-mix-navy-plaid/prd/22205012",
  ],
  BESTBUY: [
    "https://www.bestbuy.ca/en-ca/product/14777258",
    "https://www.bestbuy.ca/en-ca/product/google-chromecast-with-google-tv-snow/14924711",
  ],
  CANADA_COMPUTERS: [
    "https://www.canadacomputers.com/product_info.php?cPath=179_1927_1930&item_id=183282",
    "https://www.canadacomputers.com/product_info.php?cPath=21_273_274&item_id=120373",
  ],
  FOOTLOCKER: [
    "https://www.footlocker.ca/en/product/nike-club-fleece-hoodie-mens/7452167.html",
    "https://www.footlocker.ca/en/product/vans-old-skool-mens/45223113.html",
  ],
  MEMORY_EXPRESS: [
    "https://www.memoryexpress.com/Products/MX70319",
    "https://www.memoryexpress.com/Products/MX00113042",
  ],
  NEWEGG: [
    "https://www.newegg.ca/black-nvidia-shield-tv-pro-digital-media-streamer/p/N82E16815351017?Item=N82E16815351017&cm_sp=Homepage_dailydeals-_-P3_15-351-017-_-02032021",
    "https://www.newegg.ca/corsair-16gb-288-pin-ddr4-sdram/p/N82E16820233859?Item=N82E16820233859&cm_sp=Homepage_MKPL-_-P1_20-233-859-_-02032021",
  ],
  WALMART: [
    "https://www.walmart.ca/en/ip/blue-microphones-yeti-usb-microphone-blackout-edition/PRD6ELCF922S7Z9?rrid=richrelevance",
    "https://www.walmart.ca/en/ip/keurig-k-mini-single-serve-coffee-maker-black/6000198453943?rrid=richrelevance",
  ],
  UNIQLO: [
    "https://www.uniqlo.com/ca/en/products/E433399-000?colorCode=COL00",
    "https://www.uniqlo.com/ca/en/products/E425028-000?colorCode=COL57",
  ],
};

export const TEST_VALS: SupportedSiteMap<TestableValues[]> = {
  AMAZON: [
    {
      title:
        "Sunny Health & Fitness Rowing Machine with Magnetic Resistance, LCD Monitor, 8-level Resistance, 1117 mm Step Length, 113 KG Max. Weight - SF-RW5515, Ergometer, Training Computer",
    },
    {
      title:
        "Fire TV Stick 4K streaming device with Alexa built in, Ultra HD, Dolby Vision, includes the Alexa Voice Remote",
    },
  ],
  AEO: [
    {
      title: "AE Super Soft Hooded Sweater",
    },
    {
      title: "AE AirFlex+ Slim Jean",
    },
  ],
  ASOS: [
    {
      title: "Nike Revival hoodie in pale purple",
    },
    {
      title: "ASOS DESIGN overshirt in wool mix navy plaid",
    },
  ],
  BESTBUY: [
    {
      title: "Sony Over-Ear Noise Cancelling Bluetooth Headphones (WH-1000XM4/B) - Black",
    },
    { title: "Google Chromecast with Google TV - Snow" },
  ],
  CANADA_COMPUTERS: [
    {
      title:
        "WD Black SN850 1TB PCIe Gen4 NVMe M.2 2280 Read:7,000MB/s, Write:5,300MB/s SSD (WDS100T1X0E)",
    },
    {
      title:
        "CORSAIR Gaming K68 Mechanical Gaming Keyboard - Backlit RED LED, Cherry MX Red (CH-9102020-NA)",
    },
  ],
  FOOTLOCKER: [
    {
      title: "Nike Club Fleece Hoodie",
    },
    {
      title: "Vans Old Skool",
    },
  ],
  MEMORY_EXPRESS: [
    {
      title: "860 EVO 2.5in SSD, SATA III, 1TB",
    },
    {
      title:
        "Lenovo ThinkPad E15 Gen 2 w/ Ryzen™ 5 4500U, 8GB, 256GB NVMe SSD, 15.6in Full HD WVA, Windows 10 Pro",
    },
  ],
  NEWEGG: [
    {
      title:
        "NVIDIA SHIELD Android TV Pro - 4K HDR Streaming Media Player - High Performance, Dolby Vision, 3GB RAM, 2 x USB, Google Assistant Built-In, Works with Alexa (945-12897-2500-101)",
    },
    {
      title:
        "CORSAIR Vengeance LPX 16GB (2 x 8GB) 288-Pin DDR4 SDRAM DDR4 3200 (PC4 25600) Intel XMP 2.0 Desktop Memory Model CMK16GX4M2B3200C16",
    },
  ],
  WALMART: [
    {
      title: "Blue Microphones Yeti USB Microphone, Blackout Edition",
    },
    {
      title: "Keurig® K-Mini® Single Serve Coffee Maker",
    },
  ],
  UNIQLO: [
    {
      title: "DRY-EX CREW NECK SHORT SLEEVE T-SHIRT",
    },
    {
      title: "POCKETABLE UV PROTECTION PARKA",
    },
  ],
};
