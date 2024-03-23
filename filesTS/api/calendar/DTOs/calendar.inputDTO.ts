import {CalendarTypeEnum} from "../enums/calendar.enum"

class CalendarInputDTO {
    declare user_id: number
    declare name: string
    declare description: string | null
    declare type: CalendarTypeEnum

    constructor(input: ReadableStream<Uint8Array>) {
        Object.assign(this, input)
    }
}

export default CalendarInputDTO
