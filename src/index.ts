import { chromium, Browser, Page } from "playwright";

import config from "./config";
import utils from "./utils";
import { Config, Item } from "./types";

async function search(searchTerm: string): Promise<void> {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();

  await page.goto(config.domainUrl);
  await page.fill(config.selectors.searchInput, searchTerm);
  await page.click(config.selectors.submitButton);

  await page.waitForSelector(config.selectors.resultsContainer);

  const itemInfoExtractorFunction = (elements: any, config: Config) => {
    return elements.map((element: any) => {
      const name = element.querySelector(config.selectors.itemName)?.innerText;
      const price = element.querySelector(config.selectors.itemPrice)?.innerText;
      const href = element.querySelector(config.selectors.itemLink)?.getAttribute("href");
      return {
        name: name || "",
        price: price || "",
        url: href || "",
      };
    });
  };
  const items: Item[] = await page.$$eval(config.selectors.resultItems, itemInfoExtractorFunction, config);

  const cheapestItems = utils.getCheapestItems(items, config.numberOfItemsToExtract);
  const rows = utils.arrayToCSVData(cheapestItems, { searchTerm, domainUrl: config.domainUrl });
  utils.writeDataToCSVFile(`search-output.csv`, rows);

  await browser.close();
}

function execute() {
  // The script is expecting the search term as a command line argument
  // example: npm run search "Iphone Pro Max"
  const searchTerm: string | undefined = process.argv[2];

  if (!searchTerm) {
    console.error("Expected 1 arg for 'search' command, but found 0!");
  } else {
    search(searchTerm).catch((e) => console.error(e));
  }
}

execute();
