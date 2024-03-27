import {
    CreationOptional,
    DataTypes,
    Model
} from "sequelize"
import {RemindImportanceEnum} from "../enums/userRefEvent.enums"
import {sequelize} from "../../../databaseUtils/connectToDB"

interface URE_ModelFields {
    id: CreationOptional<number>
    user_id: number
    event_id: number
    remindImportance: CreationOptional<RemindImportanceEnum>
    creationDate: CreationOptional<number>
    updateDate: CreationOptional<number | null>
}

class URE_Model extends Model<URE_ModelFields> implements URE_ModelFields {
    declare id: CreationOptional<number>
    declare user_id: number
    declare event_id: number
    declare remindImportance: CreationOptional<RemindImportanceEnum>
    declare creationDate: CreationOptional<number>
    declare updateDate: CreationOptional<number | null>
}

URE_Model.init(
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
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        },
        remindImportance: {
            type: DataTypes.ENUM(
                ...Object.values(RemindImportanceEnum).map(value => value.toString())
            ),
            allowNull: false,
            unique: false,
            defaultValue: RemindImportanceEnum.MIDDLE
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
                function(inputtedUpdateDate: number, ure_Model: URE_Model) {
                    if (inputtedUpdateDate < ure_Model.creationDate) {
                        throw new Error("UpdateDate validation error, creationDate can not be bigger than updateDate, inputted updateDate: " + inputtedUpdateDate)
                    }
                }
            }
        }
    },
    {
        sequelize,
        tableName: "usersRefEvents"
    }
)

export default URE_Model
