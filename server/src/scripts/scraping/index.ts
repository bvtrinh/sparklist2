import "chromedriver";
import { Builder, Capabilities, ThenableWebDriver } from "selenium-webdriver";

export const makeDriver = (showImages = false): ThenableWebDriver => {
  // Set up the browser capabilities.
  const browserCapabilities = Capabilities.chrome();
  browserCapabilities.set("goog:chromeOptions", {
    args: [
      "--window-size=1900,1200",
      "--headless",
      "--disable-gpu",
      "--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
      "--disk-cache-dir=./src/scripts/scraping/cache",
    ],
    prefs: {
      "profile.managed_default_content_settings.images": showImages ? 3 : 2,
    },
  });
  return new Builder().forBrowser("chrome").withCapabilities(browserCapabilities).build();
};

export type itemInfo = {
  title: string;
  currentPrice: number;
  url: string;
  imageURL?: string;
};

export const scrollPage = async (driver: ThenableWebDriver, scrolls: number): Promise<void> => {
  for (let i = 0; i < scrolls; i++) {
    await driver.executeScript(`window.scrollBy({
      top: 2500,
      left: 0,
      behavior: "smooth",
    })`);
    await driver.sleep(1000);
  }
};
