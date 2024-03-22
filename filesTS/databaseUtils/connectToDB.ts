import {Sequelize} from "sequelize"
import {
    DB_DIALECT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST
} from "../configs/database.config"

export const sequelize: Sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        dialect: DB_DIALECT,
        host: DB_HOST,
        logging: false,
        define: {
            freezeTableName: true,
            timestamps: false
        }
    }
)
