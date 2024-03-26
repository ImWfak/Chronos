import {URC_RoleEnum} from "../enums/userRefCalendar.enums"

class URC_InputDTO {
    declare user_id: number
    declare calendar_id: number
    declare role: URC_RoleEnum | null

    constructor(input: ReadableStream<Uint8Array>) {
        Object.assign(this, input)
    }
}

export default URC_InputDTO
