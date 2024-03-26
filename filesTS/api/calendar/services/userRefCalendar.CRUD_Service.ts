import URC_InputDTO from "../DTOs/userRefCalendar.inputDTO"
import URC_OutputDTO from "../DTOs/userRefCalendar.outputDTO"
import UserModel from "../../user/models/user.model"
import CalendarModel from "../models/calendar.model"
import URC_Model from "../models/userRefCalendar.model"
import {Op} from "sequelize"

class URC_CRUD_Service {
    public static async create(URC_InputDTO: URC_InputDTO): Promise<URC_OutputDTO | Error> {
        try {
            if (!await UserModel.findByPk(URC_InputDTO.user_id)) {
                return new Error("USER_ERROR_CODE_01")
            }
            if (!await CalendarModel.findByPk(URC_InputDTO.calendar_id)) {
                return new Error("CALENDAR_ERROR_CODE_02")
            }
            if (await URC_Model.findOne({
                    where: {
                        user_id: URC_InputDTO.user_id,
                        calendar_id: URC_InputDTO.calendar_id
                    }
                })
            ) {
                return new Error("URC_ERROR_CODE_01")
            }
            const savedURC_Model: URC_Model = await URC_Model.create(URC_InputDTO as any)
            return new URC_OutputDTO(savedURC_Model)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findById(id: number): Promise<URC_OutputDTO | Error> {
        try {
            const foundedURC_Model: URC_Model | null = await URC_Model.findByPk(id)
            if (!foundedURC_Model) {
                return new Error("URC_ERROR_CODE_02")
            }
            return new URC_OutputDTO(foundedURC_Model)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findAllByUserId(user_id: number): Promise<URC_OutputDTO[] | Error> {
        try {
            const allFoundedURC_Models: URC_Model[] = await URC_Model.findAll({where: {user_id: user_id}})
            const allURC_OutputDTOs: URC_OutputDTO[] = Array()
            allFoundedURC_Models.forEach(
                function(foundedURC_Model: URC_Model) {
                    allURC_OutputDTOs.push(new URC_OutputDTO(foundedURC_Model))
                }
            )
            if (allURC_OutputDTOs.length === 0) {
                return new Error("URC_ERROR_CODE_03")
            }
            return allURC_OutputDTOs
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findAllByCalendarId(calendar_id: number): Promise<URC_OutputDTO[] | Error> {
        try {
            const allFoundedURC_Models: URC_Model[] = await URC_Model.findAll({where: {calendar_id: calendar_id}})
            const allURC_OutputDTOs: URC_OutputDTO[] = Array()
            allFoundedURC_Models.forEach(
                function(foundedURC_Model: URC_Model) {
                    allURC_OutputDTOs.push(new URC_OutputDTO(foundedURC_Model))
                }
            )
            if (allURC_OutputDTOs.length === 0) {
                return new Error("URC_ERROR_CODE_04")
            }
            return allURC_OutputDTOs
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findAll(): Promise<URC_OutputDTO[] | Error> {
        try {
            const allFoundedURC_Models: URC_Model[] = await URC_Model.findAll()
            const allURC_OutputDTO: URC_OutputDTO[] = Array()
            allFoundedURC_Models.forEach(
                function(foundedURC_Model: URC_Model) {
                    allURC_OutputDTO.push(new URC_OutputDTO(foundedURC_Model))
                }
            )
            if (allURC_OutputDTO.length ===  0) {
                return new Error("URC_ERROR_CODE_05")
            }
            return allURC_OutputDTO
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async updateById(
        id: number,
        URC_InputDTO: URC_InputDTO
    ): Promise<URC_OutputDTO | Error> {
        try {
            const foundedURC_Model: URC_Model | null =  await URC_Model.findByPk(id)
            if (!foundedURC_Model) {
                return new Error("URC_ERROR_CODE_02")
            }
            if (!await UserModel.findByPk(URC_InputDTO.user_id)) {
                return new Error("USER_ERROR_CODE_01")
            }
            if (!await CalendarModel.findByPk(URC_InputDTO.calendar_id)) {
                return new Error("CALENDAR_ERROR_CODE_02")
            }
            if (await URC_Model.findOne({
                    where: {
                        id: {[Op.ne]: id},
                        user_id: URC_InputDTO.user_id,
                        calendar_id: URC_InputDTO.calendar_id
                    }
                })
            ) {
                return new Error("URC_ERROR_CODE_01")
            }
            const updatedURC_Model: URC_Model = await foundedURC_Model.update(URC_InputDTO as any)
            return new URC_OutputDTO(updatedURC_Model)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async deleteById(id: number): Promise<URC_OutputDTO | Error> {
        try {
            const foundedURC_Model: URC_Model | null =  await URC_Model.findByPk(id)
            if (!foundedURC_Model) {
                return new Error("URC_ERROR_CODE_02")
            }
            await foundedURC_Model.destroy()
            return new URC_OutputDTO(foundedURC_Model)
        }
        catch (error) {
            return new Error(error as string)
        }
    }
}

export default URC_CRUD_Service
