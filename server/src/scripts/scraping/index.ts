import "chromedriver";
import { Builder, Capabilities, ThenableWebDriver } from "selenium-webdriver";

// Set up the browser capabilities.
const browserCapabilities = Capabilities.chrome();
browserCapabilities.set("goog:chromeOptions", {
  args: ["--window-size=1900,1200"],
});

export const makeDriver = (): ThenableWebDriver => {
  return new Builder().forBrowser("chrome").withCapabilities(browserCapabilities).build();
};

export type itemInfo = {
  title: string;
  price: number;
  itemURL: string;
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
