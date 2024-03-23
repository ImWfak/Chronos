import UserModel from "../api/user/models/user.model"
import CalendarModel from "../api/calendar/models/calendar.model"

export async function createTables() {
    try {
        await UserModel.sync({alter: true})
        await CalendarModel.sync({alter: true})
    }
    catch (error) {
        console.error("Error of creating tables: ", error)
    }
}
