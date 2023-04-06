import * as dotenv from "dotenv";
dotenv.config();

export const databaseEnv = {
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};
