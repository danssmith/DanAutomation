import dotenv from "dotenv";

dotenv.config();

export const config = {
    baseURL: process.env.BASE_URL,
    credentials: {
        username: process.env.APP_USERNAME ?? "Admin",
        password: process.env.APP_PASSWORD ?? "admin123",
    },
    timeout: 15_000,
};