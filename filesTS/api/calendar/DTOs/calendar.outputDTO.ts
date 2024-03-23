import {CalendarTypeEnum} from "../enums/calendar.enum"
import CalendarModel from "../models/calendar.model"

class CalendarOutputDTO {
    declare id: number
    declare user_id: number
    declare name: string
    declare description: string | null
    declare type: CalendarTypeEnum
    declare creationDate: number
    declare updateDate: number | null

    constructor(calendarModel: CalendarModel) {
        this.id = calendarModel.id
        this.user_id = calendarModel.user_id
        this.name = calendarModel.name
        this.description = calendarModel.description
        this.type = calendarModel.type
        this.creationDate = calendarModel.creationDate
        this.updateDate = calendarModel.updateDate
    }
}

export default CalendarOutputDTO
