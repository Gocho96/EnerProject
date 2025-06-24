import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_DATABASE: process.env.MONGO_DATABASE || "gestorDB",
  MONGO_USER: process.env.MONGO_USER || "superadmin",
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || "Admin",
  MONGO_HOST: process.env.MONGO_HOST || "localhost",
  PORT: process.env.PORT || 3000,
};

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "Supersecret";
