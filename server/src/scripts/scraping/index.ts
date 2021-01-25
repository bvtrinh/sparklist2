import { resolve } from "path";
import { Browser, Builder } from "selenium-webdriver";
import { Options, ServiceBuilder } from "selenium-webdriver/chrome";
// eslint-disable-next-line
require("dotenv").config({ path: resolve(__dirname, "../../../.env.development") });
const options = new Options().setChromeBinaryPath(process.env.CHROME_BINARY_PATH as string);

const serviceBuilder = new ServiceBuilder(process.env.CHROME_DRIVER_PATH);

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
