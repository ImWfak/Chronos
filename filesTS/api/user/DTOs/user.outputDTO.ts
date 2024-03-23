import {
    UserRemindsAccessibilityEnum,
    InviteToCalendarsAccessibilityEnum,
    InviteToEventsAccessibilityEnum
} from "../enums/user.enums"
import UserModel from "../models/user.model"

class UserOutputDTO {
    declare id: number
    declare email: string
    declare phone: string
    declare pfp_url: string
    declare name: string
    declare surname: string
    declare lastname: string | null
    declare verified: boolean
    declare remindsAccessibility: UserRemindsAccessibilityEnum
    declare calendarsAccessibility: InviteToCalendarsAccessibilityEnum
    declare eventsAccessibility: InviteToEventsAccessibilityEnum
    declare creationDate: number
    declare updateDate: number | null

    constructor(userModel: UserModel) {
        this.id = userModel.id
        this.email = userModel.email
        this.phone = userModel.phone
        this.pfp_url = userModel.pfp_url
        this.name = userModel.name
        this.surname = userModel.surname
        this.lastname = userModel.lastname
        this.verified = userModel.verified
        this.remindsAccessibility = userModel.remindsAccessibility
        this.calendarsAccessibility = userModel.calendarsAccessibility
        this.eventsAccessibility = userModel.eventsAccessibility
        this.creationDate = userModel.creationDate
        this.updateDate = userModel.updateDate
    }
}

export default UserOutputDTO
