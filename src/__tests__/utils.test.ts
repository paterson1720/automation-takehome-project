import { Item } from "../types";
import utils from "../utils";

describe("src/utils", () => {
  describe("formatPrice", () => {
    it("should return an empty string for invalid input", () => {
      expect(utils.formatPrice("abc")).toEqual("");
    });

    it("should remove commas from the input", () => {
      expect(utils.formatPrice("$1,000")).toEqual("1000");
    });

    it("should remove dollar signs from the input", () => {
      expect(utils.formatPrice("$1,000")).toEqual("1000");
    });

    it("should return the input string as is if it's already a valid price", () => {
      expect(utils.formatPrice("1000")).toEqual("1000");
    });
  });

  describe("arraToCSVData", () => {
    test("it should return an empty array if data is empty", () => {
      const options = { searchTerm: "search", domainUrl: "example.com" };
      const data: Item[] = [];
      expect(utils.arrayToCSVData(data, options)).toEqual([]);
    });

    test("it should return expected CSV data for a single item", () => {
      const options = { searchTerm: "search", domainUrl: "example.com" };
      const data: Item[] = [{ name: "Product 1", price: "10", url: "/product/1" }];
      const expectedCSVData = ["Product 1,10,search,example.com/product/1"];
      expect(utils.arrayToCSVData(data, options)).toEqual(expectedCSVData);
    });

    test("it should format item names correctly by removing commas", () => {
      const options = { searchTerm: "search", domainUrl: "example.com" };
      const data: Item[] = [{ name: "Product, 2", price: "20", url: "/product/2" }];
      const expectedCSVData = ["Product 2,20,search,example.com/product/2"];
      expect(utils.arrayToCSVData(data, options)).toEqual(expectedCSVData);
    });

    test("it should format item prices correctly using formatPrice function", () => {
      const options = { searchTerm: "search", domainUrl: "example.com" };
      const data: Item[] = [{ name: "Product 3", price: "30", url: "/product/3" }];
      const expectedCSVData = ["Product 3,30,search,example.com/product/3"];
      expect(utils.arrayToCSVData(data, options)).toEqual(expectedCSVData);
    });

    test("it should concatenate domainUrl and item url to create item link", () => {
      const options = { searchTerm: "search", domainUrl: "example.com" };
      const data: Item[] = [{ name: "Product 4", price: "40", url: "/product/4" }];
      const expectedCSVData = ["Product 4,40,search,example.com/product/4"];
      expect(utils.arrayToCSVData(data, options)).toEqual(expectedCSVData);
    });

    test("it should handle multiple items correctly", () => {
      const options = { searchTerm: "search", domainUrl: "example.com" };
      const data: Item[] = [
        { name: "Product 5", price: "50", url: "/product/5" },
        { name: "Product, 6", price: "60", url: "/product/6" },
        { name: "Product 7", price: "70", url: "/product/7" },
      ];
      const expectedCSVData = [
        "Product 5,50,search,example.com/product/5",
        "Product 6,60,search,example.com/product/6",
        "Product 7,70,search,example.com/product/7",
      ];
      expect(utils.arrayToCSVData(data, options)).toEqual(expectedCSVData);
    });
  });

  describe("getCheapestItems", () => {
    test("it returns empty array if items is empty", () => {
      expect(utils.getCheapestItems([], 5)).toEqual([]);
    });

    test("it returns empty array if count is 0", () => {
      const items = [
        { price: "10", name: "", url: "" },
        { price: "5", name: "", url: "" },
      ];
      expect(utils.getCheapestItems(items, 0)).toEqual([]);
    });

    test("it returns all items if count >= items.length", () => {
      const items = [
        { price: "5", name: "", url: "" },
        { price: "10", name: "", url: "" },
      ];
      expect(utils.getCheapestItems(items, 2)).toEqual(items);
    });

    test("it sorts and filters correctly", () => {
      const items = [
        { price: "8.00", name: "", url: "" },
        { price: "12.34", name: "", url: "" },
        { price: "not a price", name: "", url: "" },
        { price: "5.67", name: "", url: "" },
        { price: "", name: "", url: "" },
        { price: "3.00", name: "", url: "" },
        { price: "7.89", name: "", url: "" },
        { price: "-2.00", name: "", url: "" },
      ];
      expect(utils.getCheapestItems(items, 4)).toEqual([
        { price: "-2.00", name: "", url: "" },
        { price: "3.00", name: "", url: "" },
        { price: "5.67", name: "", url: "" },
        { price: "7.89", name: "", url: "" },
      ]);
    });
  });
});
