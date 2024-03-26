import UserModel from "../api/user/models/user.model"
import CalendarModel from "../api/calendar/models/calendar.model"
import URC_Model from "../api/calendar/models/userRefCalendar.model"

export async function createTables() {
    try {
        await UserModel.sync({alter: true})
        await CalendarModel.sync({alter: true})
        await URC_Model.sync({alter: true})
    }
    catch (error) {
        console.error("Error of creating tables: ", error)
    }
}
