import { config } from "dotenv";

config();

const usuario = "saludambiental";
const password = "Cambio2022";
const dbName = "saludambiental";

export const PORT = process.env.PORT || 80;
export const MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb://${usuario}:${password}@172.16.7.237:27017/${dbName}`;
