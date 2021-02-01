// File contains testing item page URLS and values

export enum SupportedSite {
  AMAZON = "AMAZON",
  AEO = "AEO",
  MEMORY_EXPRESS = "MEMORY_EXPRESS",
  WALMART = "WALMART",
  UNIQLO = "UNIQLO",
}

type SupportedSiteMap<T> = {
  [key in keyof typeof SupportedSite]: T;
};

type TestableValues = {
  title: string;
  price: number;
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
  MEMORY_EXPRESS: [
    "https://www.memoryexpress.com/Products/MX70319",
    "https://www.memoryexpress.com/Products/MX00113042",
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
      price: 375.31,
    },
    {
      title:
        "Fire TV Stick 4K streaming device with Alexa built in, Ultra HD, Dolby Vision, includes the Alexa Voice Remote",
      price: 69.99,
    },
  ],
  AEO: [
    {
      title: "AE Super Soft Hooded Sweater",
      price: 44.97,
    },
    {
      title: "AE AirFlex+ Slim Jean",
      price: 44.97,
    },
  ],
  MEMORY_EXPRESS: [
    {
      title: "860 EVO 2.5in SSD, SATA III, 1TB",
      price: 149.99,
    },
    {
      title:
        "Lenovo ThinkPad E15 Gen 2 w/ Ryzen™ 5 4500U, 8GB, 256GB NVMe SSD, 15.6in Full HD WVA, Windows 10 Pro",
      price: 949.99,
    },
  ],
  WALMART: [
    {
      title: "Blue Microphones Yeti USB Microphone, Blackout Edition",
      price: 179.98,
    },
    {
      title: "Keurig® K-Mini® Single Serve Coffee Maker",
      price: 58,
    },
  ],
  UNIQLO: [
    {
      title: "DRY-EX CREW NECK SHORT SLEEVE T-SHIRT",
      price: 24.9,
    },
    {
      title: "POCKETABLE UV PROTECTION PARKA",
      price: 49.9,
    },
  ],
};
