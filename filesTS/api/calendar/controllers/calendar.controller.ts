import {
    Request,
    Response
} from "express"
import {validationResult} from "express-validator"
import CalendarInputDTO from "../DTOs/calendar.inputDTO"
import CalendarOutputDTO from "../DTOs/calendar.outputDTO"
import CalendarCRUD_Service from "../services/calendar.CRUD_Service"

class CalendarController {
    public static async create(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                error: error.array()
            })
        }
        const calendarInputDTO: CalendarInputDTO = new CalendarInputDTO(request.body as ReadableStream<Uint8Array>)
        const result: CalendarOutputDTO | Error = await CalendarCRUD_Service.create(calendarInputDTO as any)
        if (result instanceof Error) {
            if (result.message.includes("USER_ERROR_CODE_01")) {
                return response.status(400).json({
                    message: "User with this id does not exist, inputted id: " + calendarInputDTO.user_id
                })
            }
            if (result.message.includes("CALENDAR_ERROR_CODE_01")) {
                return response.status(400).json({
                    message: "User already have main calendar, can be only one, user id: " + calendarInputDTO.user_id
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not create calendar",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "Calendar has been created",
                createdCalendar: result
            })
        }
    }

    public static async findById(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                error: error.array()
            })
        }
        const id: number = Number(request.params.id)
        const result: CalendarOutputDTO | Error = await CalendarCRUD_Service.findById(id)
        if (result instanceof Error) {
            if (result.message.includes("CALENDAR_ERROR_CODE_02")) {
                return response.status(400).json({
                    message: "Calendar with this id does not exist, inputted id: " + id
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not find calendar by id",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "Calendar has been founded by id",
                foundedCalendar: result
            })
        }
    }

    public static async findAllUserCalendarsByUserId(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                error: error.array()
            })
        }
        const user_id: number = Number(request.params.ussr_id)
        const result: CalendarOutputDTO[] | Error = await CalendarCRUD_Service.findAllUserCalendarsByUserId(user_id)
        if (result instanceof Error) {
            if (result.message.includes("CALENDAR_ERROR_CODE_03")) {
                return response.status(400).json({
                    message: "User does not have own calendars, user id: " + user_id
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not find all user`s calendars by user id",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "All user`s calendars have been founded",
                allUserCalendars: result
            })
        }
    }

    public static async findAll(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                error: error.array()
            })
        }
        const result: CalendarOutputDTO[] | Error = await CalendarCRUD_Service.findAll()
        if (result instanceof Error) {
            if (result.message.includes("CALENDAR_ERROR_CODE_04")) {
                return response.status(400).json({
                    message: "Any calendar exists in database"
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not find all calendars",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "All calendars have been founded",
                allCalendars: result
            })
        }
    }

    public static async updateById(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                error: error.array()
            })
        }
        const id: number = Number(request.params.id)
        const calendarInputDTO: CalendarInputDTO = new CalendarInputDTO(request.body as ReadableStream<Uint8Array>)
        const result: CalendarOutputDTO | Error = await CalendarCRUD_Service.updateById(id, calendarInputDTO)
        if (result instanceof Error) {
            if (result.message.includes("CALENDAR_ERROR_CODE_02")) {
                return response.status(400).json({
                    message: "Calendar with this id does not exist, inputted id: " + id
                })
            }
            if (result.message.includes("USER_ERROR_CODE_01")) {
                return response.status(400).json({
                    message: "User with this id does not exist, inputted id: " + calendarInputDTO.user_id
                })
            }
            if (result.message.includes("CALENDAR_ERROR_CODE_01")) {
                return response.status(400).json({
                    message: "User already have main calendar, can be only one, user id: " + calendarInputDTO.user_id
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not updated calendar by id",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "Calendar has been updated by id",
                updatedCalendar: result
            })
        }
    }

    public static async deleteById(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                error: error.array()
            })
        }
        const id: number = Number(request.params.id)
        const result: CalendarOutputDTO | Error = await CalendarCRUD_Service.deleteById(id)
        if (result instanceof Error) {
            if (result.message.includes("CALENDAR_ERROR_CODE_02")) {
                return response.status(400).json({
                    message: "Calendar with this id does not exist, inputted id: " + id
                })
            }
            if (result.message.includes("CALENDAR_ERROR_CODE_05")) {
                return response.status(400).json({
                    message: "User can not delete own main calendar, calendar id: " + id
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not delete calendar by id",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "Calendar has been deleted",
                deletedCalendar: result
            })
        }
    }
}

export default CalendarController
