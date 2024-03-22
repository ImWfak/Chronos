import * as dotenv from "dotenv"
dotenv.config({path: "envs/server.env"})

export const SERVER_HOST = process.env.SERVER_HOST as string
export const SERVER_PORT = process.env.SERVER_PORT as string
