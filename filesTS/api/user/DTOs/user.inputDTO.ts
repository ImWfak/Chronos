import {
    UserRemindsAccessibilityEnum,
    InviteToCalendarsAccessibilityEnum,
    InviteToEventsAccessibilityEnum
} from "../enums/user.enums"

class UserInputDTO {
    declare email: string
    declare phone: string
    declare password: string
    declare pfp_url: string
    declare name: string
    declare surname: string
    declare lastname: string | null
    declare verified: boolean
    declare remindsAccessibility: UserRemindsAccessibilityEnum | null
    declare eventsAccessibility: InviteToEventsAccessibilityEnum | null
    declare calendarsAccessibility: InviteToCalendarsAccessibilityEnum | null

    constructor(input: ReadableStream<Uint8Array>) {
        Object.assign(this, input)
    }
}

export default UserInputDTO
