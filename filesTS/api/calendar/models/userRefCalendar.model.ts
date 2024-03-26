import {
    Model,
    CreationOptional,
    DataTypes
} from "sequelize"
import {URC_RoleEnum} from "../enums/userRefCalendar.enums"
import {sequelize} from "../../../databaseUtils/connectToDB"

interface URC_ModelFields {
    id: CreationOptional<number>
    user_id: number
    calendar_id: number
    role: CreationOptional<URC_RoleEnum>
    creationDate: CreationOptional<number>
    updateDate: CreationOptional<number | null>
}

class URC_Model extends Model<URC_ModelFields> implements URC_ModelFields {
    declare id: CreationOptional<number>
    declare user_id: number
    declare calendar_id: number
    declare role: CreationOptional<URC_RoleEnum>
    declare creationDate: CreationOptional<number>
    declare updateDate: CreationOptional<number | null>
}

URC_Model.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        },
        calendar_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        },
        role: {
            type: DataTypes.ENUM(
                ...Object.values(URC_RoleEnum).map(value => value.toString())
            ),
            allowNull: false,
            unique: false,
            defaultValue: URC_RoleEnum.GUEST
        },
        creationDate: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: false,
            defaultValue: Date.now()
        },
        updateDate: {
            type: DataTypes.BIGINT,
            allowNull: true,
            unique: false,
            defaultValue: null,
            validate: {
                function(inputtedUpdateDate: number) {
                    if (inputtedUpdateDate && this.creationDate && inputtedUpdateDate < this.creationDate) {
                        throw new Error("UpdateDate validation error, creationDate can not be bigger than updateDate, inputted updateDate: " + inputtedUpdateDate)
                    }
                }
            }
        }
    },
    {
        sequelize,
        tableName: "userRefCalendar"
    }
)

export default URC_Model
