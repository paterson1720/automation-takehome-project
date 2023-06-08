import config from "../config";

export interface Item {
  name: string;
  price: string;
  url: string;
}

export type Config = typeof config;
