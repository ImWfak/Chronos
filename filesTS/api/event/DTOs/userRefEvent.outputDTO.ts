import {RemindImportanceEnum} from "../enums/userRefEvent.enums"
import URE_Model from "../models/userRefEvent.model"

class URE_OutputDTO {
    id: number
    user_id: number
    event_id: number
    remindImportance: RemindImportanceEnum
    creationDate: number
    updateDate: number | null

    constructor(ure_Model: URE_Model) {
        this.id =  ure_Model.id
        this.user_id = ure_Model.user_id
        this.event_id = ure_Model.event_id
        this.remindImportance = ure_Model.remindImportance
        this.creationDate = ure_Model.creationDate
        this.updateDate = ure_Model.updateDate
    }
}

export default URE_OutputDTO
