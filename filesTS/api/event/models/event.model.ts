import {
    CreationOptional,
    DataTypes,
    Model
} from "sequelize"
import {EventColorEnum} from "../enums/event.enum"
import {sequelize} from "../../../databaseUtils/connectToDB"

interface EventModelFields {
    id: CreationOptional<number>
    user_id: number
    calendar_id: number
    name: string
    description: CreationOptional<string | null>
    color: CreationOptional<EventColorEnum>
    repetitive: CreationOptional<boolean>
    eventBeginDate: number
    eventEndDate: CreationOptional<number>
    creationDate: CreationOptional<number>
    updateDate: CreationOptional<number | null>
}

class EventModel extends Model<EventModelFields> implements EventModelFields {
    declare id: CreationOptional<number>
    declare user_id: number
    declare calendar_id: number
    declare name: string
    declare description: CreationOptional<string | null>
    declare color: CreationOptional<EventColorEnum>
    declare repetitive: CreationOptional<boolean>
    declare eventBeginDate: number
    declare eventEndDate: CreationOptional<number>
    declare creationDate: CreationOptional<number>
    declare updateDate: CreationOptional<number | null>
}

EventModel.init(
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
        calendar_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        color: {
            type: DataTypes.ENUM(
                ...Object.values(EventColorEnum).map(value => value.toString())
            ),
            allowNull: false,
            unique: false,
            defaultValue: EventColorEnum.GRAY
        },
        repetitive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: false,
            defaultValue: false
        },
        eventBeginDate: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: false,
        },
        eventEndDate: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: false,
            defaultValue: function(eventModel: EventModel) {
                return eventModel.eventBeginDate + 1800
            },
            validate: {
                function(inputtedEventEndDate: number, eventModel: EventModel) {
                    if (inputtedEventEndDate < eventModel.eventBeginDate) {
                        throw new Error("eventEndDate validation error, eventBeginDate can not be bigger than eventEndDate, inputted eventEndDate: " + inputtedEventEndDate)
                    }
                }
            }
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
                function(inputtedUpdateDate: number, eventModel: EventModel) {
                    if (inputtedUpdateDate < eventModel.creationDate) {
                        throw new Error("UpdateDate validation error, creationDate can not be bigger than updateDate, inputted updateDate: " + inputtedUpdateDate)
                    }
                }
            }
        }
    },
    {
        sequelize,
        tableName: "events"
    }
)

export default EventModel
