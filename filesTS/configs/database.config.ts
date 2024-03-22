import * as dotenv from "dotenv"
import {Dialect} from "sequelize"
dotenv.config({path: "envs/database.env"})

export const DB_DIALECT = process.env.DB_DIALECT as Dialect
export const DB_NAME = process.env.DB_NAME as string
export const DB_USER = process.env.DB_USER as string
export const DB_PASSWORD = process.env.DB_PASSWORD as string
export const DB_HOST = process.env.DB_HOST as string
