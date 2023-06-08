import fs from "fs";
import util from "util";

import { Item } from "../types";

const writeFile = util.promisify(fs.writeFile);

const formatPrice = (priceString: string) => {
  let price = priceString.replace(/[,$]/g, "");
  if (isNaN(parseFloat(price))) return "";
  return price;
};

const writeDataToCSVFile = async (filePath: string, rows: string[]) => {
  try {
    const data: string = rows.join("\n");
    await writeFile(filePath, data, "utf8");
    console.error(`Data written to the ${filePath} file successfully`);
  } catch (error) {
    console.error("Error writing CSV file:", error);
  }
};

const arrayToCSVData = (data: Item[], options: { searchTerm: string; domainUrl: string }) => {
  return data.map((item) => {
    const name = item.name.replace(/[,]/g, "");
    const price = formatPrice(item.price);
    const link = `${options.domainUrl}${item.url}`;
    return `${name},$${price},${options.searchTerm},${link}`;
  });
};

const getCheapestItems = (items: Item[], count: number) => {
  return items
    .filter((item: Item) => Boolean(item.price) && !isNaN(parseFloat(formatPrice(item.price))))
    .sort((a: Item, b: Item) => parseFloat(a.price) - parseFloat(b.price))
    .slice(0, count);
};

export default { arrayToCSVData, formatPrice, getCheapestItems, writeDataToCSVFile };
