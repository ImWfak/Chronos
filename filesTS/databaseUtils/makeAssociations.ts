import UserModel from "../api/user/models/user.model"
import CalendarModel from "../api/calendar/models/calendar.model"
import URC_Model from "../api/calendar/models/userRefCalendar.model"

export async function createAssociations() {
    try {
        //========================================USER
        UserModel.hasMany(CalendarModel, {
            foreignKey: "user_id"
        })
        CalendarModel.belongsTo(UserModel, {
            onDelete: "SET NULL",
            foreignKey: "user_id"
        })
        //========================================CALENDAR
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
    }
    catch (error) {
        console.error("Error of creating association: ", error)
    }
}
