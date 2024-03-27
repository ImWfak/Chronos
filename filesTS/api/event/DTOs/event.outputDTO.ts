import {EventColorEnum} from "../enums/event.enum"
import EventModel from "../models/event.model"

class EventOutputDTO {
    declare id: number
    declare user_id: number
    declare calendar_id: number
    declare name: string
    declare description: string | null
    declare color: EventColorEnum
    declare repetitive: boolean
    declare eventBeginDate: number
    declare eventEndDate: number
    declare creationDate: number
    declare updateDate: number | null

    constructor(eventModel: EventModel) {
        this.id = eventModel.id
        this.user_id = eventModel.user_id
        this.calendar_id = eventModel.calendar_id
        this.name = eventModel.name
        this.description = eventModel.description
        this.color = eventModel.color
        this.repetitive = eventModel.repetitive
        this.eventBeginDate = eventModel.eventBeginDate
        this.eventEndDate = eventModel.eventEndDate
        this.creationDate = eventModel.creationDate
        this.updateDate = eventModel.updateDate
    }
}

export default EventOutputDTO
