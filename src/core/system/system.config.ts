import { cpSync, existsSync, mkdirSync } from "fs";

require("dotenv").config();

export const config = {
  host: "localhost",
  port: 5434,
  username: "postgres",
  password: "postgres",
  database: "shamba",
};

export const fileSystem = () => {
  if (!existsSync("./files")) {
    mkdirSync("./files");
    cpSync("./data.json", "./files/data.json");
  }
  if (!existsSync("./files/data.json")) {
    cpSync("./data.json", "./files/data.json");
  }
};

export const locations = { data: "./files/data.json" };
