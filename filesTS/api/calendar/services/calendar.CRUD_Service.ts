import CalendarInputDTO from "../DTOs/calendar.inputDTO"
import CalendarOutputDTO from "../DTOs/calendar.outputDTO"
import UserModel from "../../user/models/user.model"
import CalendarModel from "../models/calendar.model"
import {CalendarTypeEnum} from "../enums/calendar.enum"

class CalendarCRUD_Service {
    public static async create(calendarInputDTO: CalendarInputDTO): Promise<CalendarOutputDTO | Error> {
        try {
            if (!await UserModel.findByPk(calendarInputDTO.user_id)) {
                return new Error("API_ERROR_CODE_001")
            }
            if (
                calendarInputDTO.type == CalendarTypeEnum.MAIN &&
                await CalendarModel.findOne({
                    where: {
                        user_id: calendarInputDTO.user_id,
                        type: CalendarTypeEnum.MAIN
                    }
                })
            ) {
                return new Error()
            }
            const savedCalendarModel: CalendarModel = await CalendarModel.create(calendarInputDTO as any)
            return new CalendarOutputDTO(savedCalendarModel)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findById(id: number): Promise<CalendarOutputDTO | Error> {
        try {
            const foundedCalendarModel: CalendarModel | null = await CalendarModel.findByPk(id)
            if (!foundedCalendarModel) {
                return new Error()
            }
            return new CalendarOutputDTO(foundedCalendarModel)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findAllUserCalendars(user_id: number) : Promise<CalendarOutputDTO[] | Error> {
        try {
            const allFoundedUserCalendarsModels: CalendarModel[] = await CalendarModel.findAll({where: {user_id: user_id}})
            const allUserCalendarsOutputDTOs: CalendarOutputDTO[] = []
            allFoundedUserCalendarsModels.forEach(
                function(foundedCalendarModel: CalendarModel) {
                    allUserCalendarsOutputDTOs.push(new CalendarOutputDTO(foundedCalendarModel))
                }
            )
            if (allUserCalendarsOutputDTOs.length === 0) {
                return new Error()
            }
            return allUserCalendarsOutputDTOs
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findAll(): Promise<CalendarOutputDTO[] | Error> {
        try {
            const allFoundedCalendarsModels: CalendarModel[] = await CalendarModel.findAll()
            const allCalendarsOutputDTOs: CalendarOutputDTO[] = []
            allFoundedCalendarsModels.forEach(
                function(foundedCalendarModel: CalendarModel) {
                    allCalendarsOutputDTOs.push(new CalendarOutputDTO(foundedCalendarModel))
                }
            )
            if (allCalendarsOutputDTOs.length === 0) {
                return new Error()
            }
            return allCalendarsOutputDTOs
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async updateById(
        id: number,
        calendarInputDTO: CalendarInputDTO
    ): Promise<CalendarOutputDTO | Error> {
        try {
            const foundedCalendarModel: CalendarModel | null = await CalendarModel.findByPk(id)
            if (!foundedCalendarModel) {
                return new Error()
            }
            if (calendarInputDTO.type == CalendarTypeEnum.MAIN &&
                await CalendarModel.findOne({
                    where: {
                        user_id: calendarInputDTO.user_id,
                        type: CalendarTypeEnum.MAIN
                    }
                })
            ) {
                return new Error()
            }
            const updatedCalendarModel: CalendarModel = await foundedCalendarModel.update(calendarInputDTO as any)
            return new CalendarOutputDTO(updatedCalendarModel)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async deleteById(id: number): Promise<CalendarOutputDTO | Error> {
        try {
            const foundedCalendarModel: CalendarModel | null = await CalendarModel.findByPk(id)
            if (!foundedCalendarModel) {
                return new Error()
            }
            await foundedCalendarModel.destroy()
            return new CalendarOutputDTO(foundedCalendarModel)
        }
        catch (error) {
            return new Error(error as string)
        }
    }
}

export default CalendarCRUD_Service
