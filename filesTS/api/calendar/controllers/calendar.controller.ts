import {Request, Response} from "express"
import {validationResult} from "express-validator"
import CalendarInputDTO from "../DTOs/calendar.inputDTO"
import CalendarOutputDTO from "../DTOs/calendar.outputDTO"
import URC_InputDTO from "../DTOs/userRefCalendar.inputDTO"
import URC_OutputDTO from "../DTOs/userRefCalendar.outputDTO"
import CalendarCRUD_Service from "../services/calendar.CRUD_Service"
import URC_CRUD_Service from "../services/userRefCalendar.CRUD_Service"
import {URC_RoleEnum} from "../enums/userRefCalendar.enums"

class CalendarController {
    public static async createCalendar(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                error: error.array()
            })
        }
        const calendarInputDTO: CalendarInputDTO = new CalendarInputDTO(request.body as ReadableStream<Uint8Array>)
        const calendarResult: CalendarOutputDTO | Error = await CalendarCRUD_Service.create(calendarInputDTO as any)
        if (calendarResult instanceof Error) {
            if (calendarResult.message.includes("USER_ERROR_CODE_01")) {
                return response.status(400).json({
                    message: "User with this id does not exist, inputted id: " + calendarInputDTO.user_id
                })
            }
            if (calendarResult.message.includes("CALENDAR_ERROR_CODE_01")) {
                return response.status(400).json({
                    message: "User already have main calendar, can be only one, user id: " + calendarInputDTO.user_id
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not create calendar",
                    error: calendarResult.message
                })
            }
        }
        else {
            const urc_InputDTO: URC_InputDTO = new URC_InputDTO({
                user_id: calendarInputDTO.user_id,
                calendar_id: calendarResult.id,
                role: URC_RoleEnum.ADMIN
            } as any)
            const URC_Result: URC_OutputDTO | Error = await URC_CRUD_Service.create(urc_InputDTO)
            if (URC_Result instanceof Error) {
                if (URC_Result.message.includes("USER_ERROR_CODE_01")) {
                    return response.status(400).json({
                        message: "User with this id does not exist, inputted id: " + calendarInputDTO.user_id
                    })
                }
                if (URC_Result.message.includes("CALENDAR_ERROR_CODE_02")) {
                    return response.status(400).json({
                        message: "Calendar with this id does not exist, inputted id: " + calendarResult.id
                    })
                }
                if (URC_Result.message.includes("URC_ERROR_CODE_01")) {
                    return response.status(400).json({
                        message: "User calendar reference already exist,"
                        + " inputted user id: " + calendarInputDTO.user_id
                        + " inputted calendar id: " + calendarResult.id
                    })
                }
                else {
                    return response.status(500).json({
                        message: "Server can not create user calendar reference",
                        error: URC_Result.message
                    })
                }
            }
            else {
                return response.status(200).json({
                    message: "Calendar has been created with owner, owner id: " + calendarInputDTO.user_id,
                    createdCalendar: calendarResult,
                    createdURC: URC_Result
                })
            }
        }
    }

    public static async createURC(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                error: error.array()
            })
        }
        const urc_InputDTO: URC_InputDTO = new URC_InputDTO(request.body as ReadableStream<Uint8Array>)
        const result: URC_OutputDTO | Error = await URC_CRUD_Service.create(urc_InputDTO)
        if (result instanceof Error) {
            if (result.message.includes("USER_ERROR_CODE_01")) {
                return response.status(400).json({
                    message: "User with this id does not exist, inputted id: " + urc_InputDTO.user_id
                })
            }
            if (result.message.includes("CALENDAR_ERROR_CODE_02")) {
                return response.status(400).json({
                    message: "Calendar with this id does not exist, inputted id: " + urc_InputDTO.calendar_id
                })
            }
            if (result.message.includes("URC_ERROR_CODE_01")) {
                return response.status(400).json({
                    message: "User calendar reference already exist,"
                        + " inputted user id: " + urc_InputDTO.user_id
                        + ", inputted calendar id: " + urc_InputDTO.calendar_id
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not create user calendar reference",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "User calendar reference has been created",
                createURC: result
            })
        }
    }

    public static async findCalendarById(request: Request, response: Response) {
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

    public static async findURC_ById(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                error: error.array()
            })
        }
        const id: number = Number(request.params.id)
        const result: URC_OutputDTO | Error = await URC_CRUD_Service.findById(id)
        if (result instanceof Error) {
            if (result.message.includes("URC_ERROR_CODE_02")) {
                return response.status(400).json({
                    message: "User calendar reference with inputted id does not exist, inputted id: " + id
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not find user calendar reference by id",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "User calendar reference has been founded by id",
                foundedURC: result
            })
        }
    }

    public static async findAllCalendarsByUserId(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                error: error.array()
            })
        }
        const user_id: number = Number(request.params.user_id)
        const result: CalendarOutputDTO[] | Error = await CalendarCRUD_Service.findAllCalendarsByUserId(user_id)
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
                message: "All user`s calendars have been founded by user id",
                allFoundedCalendars: result
            })
        }
    }

    public static async findAllURC_ByUserId(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                error: error.array()
            })
        }
        const user_id: number = Number(request.params.user_id)
        const result: URC_OutputDTO[] | Error = await URC_CRUD_Service.findAllByUserId(user_id)
        if (result instanceof Error) {
            if (result.message.includes("URC_ERROR_CODE_03")) {
                return response.status(400).json({
                    message: "Any user calendar references to exist with this user id, inputted user id: " + user_id
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not find all user calendar references by user id",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "All user calendar references have been found by user id",
                allFoundedURCs: result
            })
        }
    }

    public static async findAllURC_ByCalendarId(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                error: error.array()
            })
        }
        const calendar_id: number = Number(request.params.calendar_id)
        const result: URC_OutputDTO[] | Error = await URC_CRUD_Service.findAllByCalendarId(calendar_id)
        if (result instanceof Error) {
            if (result.message.includes("URC_ERROR_CODE_04")) {
                return response.status(400).json({
                    message: "Any user calendar references to exist with this calendar id, inputted calendar id: " + calendar_id
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not find all user calendar references by calendar id",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "All user calendar references have been found by calendar id",
                allFoundedURCs: result
            })
        }
    }

    public static async findAllCalendars(request: Request, response: Response) {
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
                allFoundedCalendars: result
            })
        }
    }

    public static async findAllURC(request: Request, response: Response) {
        const result: URC_OutputDTO[] | Error = await URC_CRUD_Service.findAll()
        if (result instanceof Error) {
            if (result.message.includes("URC_ERROR_CODE_05")) {
                return response.status(400).json({
                    message: "Any user calendar reference exist in database"
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not find all user calendar references"
                })
            }
        }
        else {
            return response.status(200).json({
                message: "All user calendar references have been founded",
                allFoundedURCs: result
            })
        }
    }

    public static async updateCalendarById(request: Request, response: Response) {
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
            if (result.message.includes("CALENDAR_ERROR_CODE_05")) {
                return response.status(400).json({
                    message: "Calendar can not be cast from main to additional, calendar id: " + id
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

    public static async updateURC_ById(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                error: error.array()
            })
        }
        const id: number = Number(request.params.id)
        const urc_InputDTO: URC_InputDTO = new URC_InputDTO(request.body as ReadableStream<Uint8Array>)
        const result: URC_OutputDTO | Error = await URC_CRUD_Service.updateById(id, urc_InputDTO)
        if (result instanceof Error) {
            if (result.message.includes("URC_ERROR_CODE_02")) {
                return response.status(400).json({
                    message: "User calendar reference with inputted id does not exist, inputted id: " + id
                })
            }
            if (result.message.includes("USER_ERROR_CODE_01")) {
                return response.status(400).json({
                    message: "User with this id does not exist, inputted id: " + urc_InputDTO.user_id
                })
            }
            if (result.message.includes("CALENDAR_ERROR_CODE_02")) {
                return response.status(400).json({
                    message: "Calendar with this id does not exist, inputted id: " + urc_InputDTO.calendar_id
                })
            }
            if (result.message.includes("URC_ERROR_CODE_01")) {
                return response.status(400).json({
                    message: "User calendar reference already exist,"
                        + " inputted user id: " + urc_InputDTO.user_id
                        + " inputted calendar id: " + urc_InputDTO.calendar_id
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not update user calendar reference by id",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "User calendar reference has been updated by id",
                updatedURC: result
            })
        }
    }

    public static async deleteCalendarById(request: Request, response: Response) {
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
            if (result.message.includes("CALENDAR_ERROR_CODE_06")) {
                return response.status(400).json({
                    message: "Main calendar can not be deleted, calendar id: " + id
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

    public static async deleteURC_ById(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                error: error.array()
            })
        }
        const id: number = Number(request.params.id)
        const result: URC_InputDTO | Error = await URC_CRUD_Service.deleteById(id)
        if (result instanceof Error) {
            if (result.message.includes("URC_ERROR_CODE_02")) {
                return response.status(400).json({
                    message: "User calendar reference with inputted id does not exist, inputted id: " + id
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not delete user calendar reference by id",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "User calendar reference has been deleted by id",
                deletedURC: result
            })
        }
    }
}

export default CalendarController
