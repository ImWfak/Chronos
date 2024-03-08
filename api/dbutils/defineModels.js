import {sequelize} from "./connectDB.js"
import {undefUserModel} from "../models/user.model.js"
import {undefCalendarModel} from "../models/calendar.model.js"

export const userModel = await sequelize.define("users", undefUserModel)
export const calendarModel = await sequelize.define("calendars", undefCalendarModel)
