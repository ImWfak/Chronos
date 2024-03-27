import {CreationOptional} from "sequelize"
import {RemindImportanceEnum} from "../enums/userRefEvent.enums"

class URE_InputDTO {
    declare user_id: number
    declare event_id: number
    declare remindImportance: RemindImportanceEnum | null

    constructor(input: ReadableStream<Uint8Array>) {
        Object.assign(this, input)
    }
}

export default URE_InputDTO
