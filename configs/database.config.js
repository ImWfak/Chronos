import dotenv from "dotenv"
dotenv.config({path: "./envs/.env.database"})

export const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_DIALECT,
    DB_HOST
} = process.env
