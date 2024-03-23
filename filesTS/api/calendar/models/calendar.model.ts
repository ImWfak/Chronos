import {
    Model,
    CreationOptional,
    DataTypes
} from "sequelize"
import {CalendarTypeEnum} from "../enums/calendar.enum"
import {sequelize} from "../../../databaseUtils/connectToDB"

interface CalendarModelFields {
    id: CreationOptional<number>
    user_id: number
    name: string
    description: CreationOptional<string | null>
    type: CreationOptional<CalendarTypeEnum>
    creationDate: CreationOptional<number>
    updateDate: CreationOptional<number | null>
}

class CalendarModel extends Model<CalendarModelFields> implements CalendarModelFields {
    declare id: CreationOptional<number>
    declare user_id: number
    declare name: string
    declare description: CreationOptional<string | null>
    declare type: CreationOptional<CalendarTypeEnum>
    declare creationDate: CreationOptional<number>
    declare updateDate: CreationOptional<number | null>
}

CalendarModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
            defaultValue: null
        },
        type: {
            type: DataTypes.ENUM(
                ...Object.values(CalendarTypeEnum).map(value => value.toString())
            ),
            allowNull: false,
            unique: false,
            defaultValue: CalendarTypeEnum.ADDITIONAL
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
        tableName: "calendars"
    }
)

export default CalendarModel
