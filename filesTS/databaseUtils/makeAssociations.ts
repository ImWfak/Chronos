import UserModel from "../api/user/models/user.model"
import CalendarModel from "../api/calendar/models/calendar.model"

export async function createAssociations() {
    try {
        UserModel.hasMany(CalendarModel, {
            foreignKey: "user_id"
        })
        CalendarModel.belongsTo(UserModel, {
            onDelete: "SET NULL",
            foreignKey: "user_id"
        })
    }
    catch (error) {
        console.error("Error of creating association: ", error)
    }
}