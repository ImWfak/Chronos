import URE_InputDTO from "../DTOs/userRefEvent.inputDTO"
import URE_OutputDTO from "../DTOs/userRefEvent.outputDTO"
import UserModel from "../../user/models/user.model"
import EventModel from "../models/event.model"
import URE_Model from "../models/userRefEvent.model"
import {Op} from "sequelize"

class URE_CRUD_Service {
    public static async create(ure_InputDTO: URE_InputDTO): Promise<URE_OutputDTO | Error> {
        try {
            if (!await UserModel.findByPk(ure_InputDTO.user_id)) {
                return new Error("USER_ERROR_CODE_01")
            }
            if (!await EventModel.findByPk(ure_InputDTO.event_id)) {
                return new Error("EVENT_ERROR_CODE_02")
            }
            if (await URE_Model.findOne({
                    where: {
                        user_id: ure_InputDTO.user_id,
                        event_id: ure_InputDTO.event_id
                    }
                })
            ) {
                return new Error("URE_ERROR_CODE_01")
            }
            const savedURE_Model: URE_Model = await URE_Model.create(ure_InputDTO as any)
            return new URE_OutputDTO(savedURE_Model)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findById(id: number): Promise<URE_OutputDTO | Error> {
        try {
            const foundedURE_Model: URE_Model | null = await URE_Model.findByPk(id)
            if (!foundedURE_Model) {
                return new Error("URE_ERROR_CODE_02")
            }
            return new URE_OutputDTO(foundedURE_Model)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findAllByUserId(user_id: number): Promise<URE_OutputDTO[] | Error> {
        try {
            const allFoundedURE_Models: URE_Model[] = await URE_Model.findAll({where: {user_id: user_id}})
            const allURE_OutputDTOs: URE_OutputDTO[] = Array()
            allFoundedURE_Models.forEach(
                function(foundedURE_Model: URE_Model) {
                    allURE_OutputDTOs.push(new URE_OutputDTO(foundedURE_Model))
                }
            )
            if (allURE_OutputDTOs.length === 0) {
                return new Error("URE_ERROR_CODE_03")
            }
            return allURE_OutputDTOs
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findAllByEventId(event_id: number): Promise<URE_OutputDTO[] | Error> {
        try {
            const allFoundedURE_Models: URE_Model[] = await URE_Model.findAll({where: {event_id: event_id}})
            const allURE_OutputDTOs: URE_OutputDTO[] = Array()
            allFoundedURE_Models.forEach(
                function(foundedURE_Model: URE_Model) {
                    allURE_OutputDTOs.push(new URE_OutputDTO(foundedURE_Model))
                }
            )
            if (allURE_OutputDTOs.length === 0) {
                return new Error("URE_ERROR_CODE_04")
            }
            return allURE_OutputDTOs
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findAll(): Promise<URE_OutputDTO[] | Error> {
        try {
            const allFoundedURE_Models: URE_Model[] = await URE_Model.findAll()
            const allURE_OutputDTOs: URE_OutputDTO[] = Array()
            allFoundedURE_Models.forEach(
                function(foundedURE_Model: URE_Model) {
                    allURE_OutputDTOs.push(new URE_OutputDTO(foundedURE_Model))
                }
            )
            if (allURE_OutputDTOs.length === 0) {
                return new Error("URE_ERROR_CODE_05")
            }
            return allURE_OutputDTOs
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async updateById(
        id: number,
        ure_InputDTO: URE_InputDTO
    ): Promise<URE_OutputDTO | Error> {
        try {
            const foundedURE_Model: URE_Model | null = await URE_Model.findByPk(id)
            if (!foundedURE_Model) {
                return new Error("URE_ERROR_CODE_02")
            }
            if (!await UserModel.findByPk(ure_InputDTO.user_id)) {
                return new Error("USER_ERROR_CODE_01")
            }
            if (!await EventModel.findByPk(ure_InputDTO.event_id)) {
                return new Error("EVENT_ERROR_CODE_02")
            }
            if (await URE_Model.findOne({
                    where: {
                        id: {[Op.ne]: id},
                        user_id: ure_InputDTO.user_id,
                        event_id: ure_InputDTO.event_id
                    }
                })
            ) {
                return new Error("URE_ERROR_CODE_01")
            }
            const updatedURE_Model: URE_Model = await foundedURE_Model.update(ure_InputDTO as any)
            return new URE_OutputDTO(updatedURE_Model)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async deleteById(id: number): Promise<URE_OutputDTO | Error> {
        try {
            const foundedURE_Model: URE_Model | null =  await URE_Model.findByPk(id)
            if (!foundedURE_Model) {
                return new Error("URE_ERROR_CODE_02")
            }
            await foundedURE_Model.destroy()
            return new URE_OutputDTO(foundedURE_Model)
        }
        catch (error) {
            return new Error(error as string)
        }
    }
}

export default URE_CRUD_Service
