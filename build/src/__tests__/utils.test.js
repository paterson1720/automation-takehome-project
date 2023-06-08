"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __importDefault(require("../utils"));
describe("src/utils", function () {
    describe("formatPrice", function () {
        it("should return an empty string for invalid input", function () {
            expect(utils_1.default.formatPrice("abc")).toEqual("");
        });
        it("should remove commas from the input", function () {
            expect(utils_1.default.formatPrice("$1,000")).toEqual("1000");
        });
        it("should remove dollar signs from the input", function () {
            expect(utils_1.default.formatPrice("$1,000")).toEqual("1000");
        });
        it("should return the input string as is if it's already a valid price", function () {
            expect(utils_1.default.formatPrice("1000")).toEqual("1000");
        });
    });
    describe("arraToCSVData", function () {
        test("it should return an empty array if data is empty", function () {
            var options = { searchTerm: "search", domainUrl: "example.com" };
            var data = [];
            expect(utils_1.default.arrayToCSVData(data, options)).toEqual([]);
        });
        test("it should return expected CSV data for a single item", function () {
            var options = { searchTerm: "search", domainUrl: "example.com" };
            var data = [{ name: "Product 1", price: "10", url: "/product/1" }];
            var expectedCSVData = ["Product 1,10,search,example.com/product/1"];
            expect(utils_1.default.arrayToCSVData(data, options)).toEqual(expectedCSVData);
        });
        test("it should format item names correctly by removing commas", function () {
            var options = { searchTerm: "search", domainUrl: "example.com" };
            var data = [{ name: "Product, 2", price: "20", url: "/product/2" }];
            var expectedCSVData = ["Product 2,20,search,example.com/product/2"];
            expect(utils_1.default.arrayToCSVData(data, options)).toEqual(expectedCSVData);
        });
        test("it should format item prices correctly using formatPrice function", function () {
            var options = { searchTerm: "search", domainUrl: "example.com" };
            var data = [{ name: "Product 3", price: "30", url: "/product/3" }];
            var expectedCSVData = ["Product 3,30,search,example.com/product/3"];
            expect(utils_1.default.arrayToCSVData(data, options)).toEqual(expectedCSVData);
        });
        test("it should concatenate domainUrl and item url to create item link", function () {
            var options = { searchTerm: "search", domainUrl: "example.com" };
            var data = [{ name: "Product 4", price: "40", url: "/product/4" }];
            var expectedCSVData = ["Product 4,40,search,example.com/product/4"];
            expect(utils_1.default.arrayToCSVData(data, options)).toEqual(expectedCSVData);
        });
        test("it should handle multiple items correctly", function () {
            var options = { searchTerm: "search", domainUrl: "example.com" };
            var data = [
                { name: "Product 5", price: "50", url: "/product/5" },
                { name: "Product, 6", price: "60", url: "/product/6" },
                { name: "Product 7", price: "70", url: "/product/7" },
            ];
            var expectedCSVData = [
                "Product 5,50,search,example.com/product/5",
                "Product 6,60,search,example.com/product/6",
                "Product 7,70,search,example.com/product/7",
            ];
            expect(utils_1.default.arrayToCSVData(data, options)).toEqual(expectedCSVData);
        });
    });
    describe("getCheapestItems", function () {
        test("it returns empty array if items is empty", function () {
            expect(utils_1.default.getCheapestItems([], 5)).toEqual([]);
        });
        test("it returns empty array if count is 0", function () {
            var items = [
                { price: "10", name: "", url: "" },
                { price: "5", name: "", url: "" },
            ];
            expect(utils_1.default.getCheapestItems(items, 0)).toEqual([]);
        });
        test("it returns all items if count >= items.length", function () {
            var items = [
                { price: "5", name: "", url: "" },
                { price: "10", name: "", url: "" },
            ];
            expect(utils_1.default.getCheapestItems(items, 2)).toEqual(items);
        });
        test("it sorts and filters correctly", function () {
            var items = [
                { price: "8.00", name: "", url: "" },
                { price: "12.34", name: "", url: "" },
                { price: "not a price", name: "", url: "" },
                { price: "5.67", name: "", url: "" },
                { price: "", name: "", url: "" },
                { price: "3.00", name: "", url: "" },
                { price: "7.89", name: "", url: "" },
                { price: "-2.00", name: "", url: "" },
            ];
            expect(utils_1.default.getCheapestItems(items, 4)).toEqual([
                { price: "-2.00", name: "", url: "" },
                { price: "3.00", name: "", url: "" },
                { price: "5.67", name: "", url: "" },
                { price: "7.89", name: "", url: "" },
            ]);
        });
    });
});
