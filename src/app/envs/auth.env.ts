import * as dotenv from "dotenv";
dotenv.config();

export const authEnv = {
    secret: process.env.JWT_SECRET,
};
