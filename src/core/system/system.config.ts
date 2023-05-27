import { cpSync, existsSync, mkdirSync } from "fs";

require("dotenv").config();

export const config = {
  host: "localhost",
  port: 5434,
  username: "postgres",
  password: "postgres",
  database: "shamba",
};

export const fileSystem = () => {};

export const locations = { data: "./files/data.json" };
