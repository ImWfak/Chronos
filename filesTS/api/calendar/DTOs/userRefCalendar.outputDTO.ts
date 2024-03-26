import {URC_RoleEnum} from "../enums/userRefCalendar.enums"
import URC_Model from "../models/userRefCalendar.model"

class URC_OutputDTO {
    declare id: number
    declare user_id: number
    declare calendar_id: number
    declare role: URC_RoleEnum
    declare creationDate: number
    declare updateDate: number | null

    constructor(URC_Model: URC_Model) {
        this.id = URC_Model.id
        this.user_id = URC_Model.user_id
        this.calendar_id = URC_Model.calendar_id
        this.role = URC_Model.role
        this.creationDate = URC_Model.creationDate
        this.updateDate = URC_Model.updateDate
    }
}

export default URC_OutputDTO
