import { resolve } from "path";
import { Browser, Builder, ThenableWebDriver } from "selenium-webdriver";
import { Options, ServiceBuilder } from "selenium-webdriver/chrome";
// eslint-disable-next-line
require("dotenv").config({ path: resolve(__dirname, "../../../.env.development") });
const CHROME_DRIVER_PATH = process.env.CHROME_DRIVER_PATH as string;
const CHROME_BINARY_PATH = process.env.CHROME_BINARY_PATH as string;

const options = new Options().setChromeBinaryPath(CHROME_BINARY_PATH);
const serviceBuilder = new ServiceBuilder(CHROME_DRIVER_PATH);

export const driver = new Builder()
  .forBrowser(Browser.CHROME)
  .setChromeOptions(options)
  .setChromeService(serviceBuilder)
  .build();

export type itemInfo = {
  title: string;
  price: number;
  itemURL: string;
  imageURL?: string;
};

export const scrollPage = async (driver: ThenableWebDriver, scrolls: number) => {
  for (let i = 0; i < scrolls; i++) {
    await driver.executeScript(`window.scrollBy({
      top: 2500,
      left: 0,
      behavior: "smooth",
    })`);
    await driver.sleep(1000);
  }
};
