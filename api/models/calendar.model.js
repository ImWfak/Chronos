import {DataTypes} from "sequelize"
import {calendarTypesEnum} from "../enums/calendarTypesEnum.js";

export const undefCalendarModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    name: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    calendarType: {
        type: DataTypes.ENUM(...Object.values(calendarTypesEnum)),
        notNull: true,
        defaultValue: function() {
            return calendarTypesEnum.ADDITIONAL
        },
        validate: {
            customValidator(inputType) {
                if (!Object.values(calendarTypesEnum).includes(inputType)) {
                    throw new Error("Wrong calendar type"
                        + "\nAvailable calendar types: " + Object.values(calendarTypesEnum)
                        + "\nInputted value: " + inputType)
                }
            }
        }
    },
    creationDate: {
        type: DataTypes.BIGINT,
        defaultValue: function () {
            return Date.now()
        }
    },
    updateDate: {
        type: DataTypes.BIGINT,
        defaultValue: null,
        validate: {
            customValidator(inputUpdateDate) {
                if (inputUpdateDate < this.creationDate) {
                    throw new Error(
                        "Wrong updateDate value"
                        + "\nUpdateDate value must be bigger than creationDate value: " + this.creationDate
                        + "\nInputted value of updateDate: " + inputUpdateDate)
                }
            }
        }
    }
}
