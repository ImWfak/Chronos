import {EventColorEnum} from "../enums/event.enum"

class EventInputDTO {
    declare user_id: number
    declare calendar_id: number
    declare name: string
    declare description: string | null
    declare color: EventColorEnum | null
    declare repetitive: boolean | null
    declare eventBeginDate: number
    declare eventEndDate: number | null

    constructor(input: ReadableStream<Uint8Array>) {
        Object.assign(this, input)
    }
}

export default EventInputDTO
