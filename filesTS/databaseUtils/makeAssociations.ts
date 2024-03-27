import UserModel from "../api/user/models/user.model"
import CalendarModel from "../api/calendar/models/calendar.model"
import URC_Model from "../api/calendar/models/userRefCalendar.model"
import EventModel from "../api/event/models/event.model"
import URE_Model from "../api/event/models/userRefEvent.model"

export async function createAssociations() {
    try {
        //========================================CALENDAR
        UserModel.hasMany(CalendarModel, {
            foreignKey: "user_id"
        })
        CalendarModel.belongsTo(UserModel, {
            onDelete: "SET NULL",
            foreignKey: "user_id"
        })

        UserModel.hasMany(URC_Model, {
            foreignKey: "user_id"
        })
        URC_Model.belongsTo(UserModel, {
            onDelete: "CASCADE",
            foreignKey: "user_id"
        })

        CalendarModel.hasMany(URC_Model, {
            foreignKey: "calendar_id"
        })
        URC_Model.belongsTo(UserModel, {
            onDelete: "CASCADE",
            foreignKey: "calendar_id"
        })
        //========================================EVENT
        UserModel.hasMany(EventModel, {
            foreignKey: "user_id"
        })
        EventModel.belongsTo(UserModel, {
            onDelete: "CASCADE",
            foreignKey: "user_id"
        })

        CalendarModel.hasMany(EventModel, {
            foreignKey: "calendar_id"
        })
        EventModel.belongsTo(CalendarModel, {
            onDelete: "CASCADE",
            foreignKey: "calendar_id"
        })

        UserModel.hasMany(URE_Model, {
            foreignKey: "user_id"
        })
        URE_Model.belongsTo(UserModel, {
            onDelete: "CASCADE",
            foreignKey: "user_id"
        })

        EventModel.hasMany(URE_Model, {
            foreignKey: "event_id"
        })
        URE_Model.belongsTo(EventModel, {
            onDelete: "CASCADE",
            foreignKey: "event_id"
        })
    }
    catch (error) {
        console.error("Error of creating association: ", error)
    }
}
