import EventInputDTO from "../DTOs/event.inputDTO"
import EventOutputDTO from "../DTOs/event.outputDTO"
import UserModel from "../../user/models/user.model"
import CalendarModel from "../../calendar/models/calendar.model"
import EventModel from "../models/event.model"

class EventCRUD_Service {
    public static async create(eventInputDTO: EventInputDTO): Promise<EventOutputDTO | Error> {
        try {
            if (!await UserModel.findByPk(eventInputDTO.user_id)) {
                return new Error("USER_ERROR_CODE_01")
            }
            if (!await CalendarModel.findByPk(eventInputDTO.calendar_id)) {
                return new Error("CALENDAR_ERROR_CODE_02")
            }
            if (eventInputDTO.eventEndDate !== null &&
                eventInputDTO.eventEndDate > eventInputDTO.eventBeginDate
            ) {
                return new Error("EVENT_ERROR_CODE_01")
            }
            const savedEventModel: EventModel = await EventModel.create(eventInputDTO as any)
            return new EventOutputDTO(savedEventModel)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findById(id: number): Promise<EventOutputDTO | Error> {
        try {
            const foundedEventModel: EventModel | null = await EventModel.findByPk(id)
            if (!foundedEventModel) {
                return new Error("EVENT_ERROR_CODE_02")
            }
            return new EventOutputDTO(foundedEventModel)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findAllByUserId(user_id: number): Promise<EventOutputDTO[] | Error> {
        try {
            const allFoundedEventModels: EventModel[] = await EventModel.findAll({where: {user_id: user_id}})
            const allEventsOutputDTOs: EventOutputDTO[] = Array()
            allFoundedEventModels.forEach(
                function(foundedEventModel: EventModel) {
                    allEventsOutputDTOs.push(new EventOutputDTO(foundedEventModel))
                }
            )
            if (allEventsOutputDTOs.length === 0) {
                return new Error("EVENT_ERROR_CODE_03")
            }
            return allEventsOutputDTOs
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findAllByCalendar_id(calendar_id: number): Promise<EventOutputDTO[] | Error> {
        try {
            const allFoundedEventModels: EventModel[] = await EventModel.findAll({where: {calendar_id: calendar_id}})
            const allEventsOutputDTOs: EventOutputDTO[] = Array()
            allFoundedEventModels.forEach(
                function(foundedEventModel: EventModel) {
                    allEventsOutputDTOs.push(new EventOutputDTO(foundedEventModel))
                }
            )
            if (allEventsOutputDTOs.length === 0) {
                return new Error("EVENT_ERROR_CODE_04")
            }
            return allEventsOutputDTOs
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findAll(): Promise<EventOutputDTO[] | Error> {
        try {
            const allFoundedEventModels: EventModel[] = await EventModel.findAll()
            const allEventsOutputDTOs: EventOutputDTO[] = Array()
            allFoundedEventModels.forEach(
                function(foundedEventModel: EventModel) {
                    allEventsOutputDTOs.push(new EventOutputDTO(foundedEventModel))
                }
            )
            if (allEventsOutputDTOs.length === 0) {
                return new Error("EVENT_ERROR_CODE_05")
            }
            return allEventsOutputDTOs
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async updateById(
        id: number,
        eventInputDTO : EventInputDTO
    ): Promise<EventOutputDTO | Error> {
        try {
            const foundedEventModel: EventModel | null = await EventModel.findByPk(id)
            if (!foundedEventModel) {
                return new Error("EVENT_ERROR_CODE_02")
            }
            if (!await UserModel.findByPk(eventInputDTO.user_id)) {
                return new Error("USER_ERROR_CODE_01")
            }
            if (!await CalendarModel.findByPk(eventInputDTO.calendar_id)) {
                return new Error("CALENDAR_ERROR_CODE_02")
            }
            if (eventInputDTO.eventEndDate !== null &&
                eventInputDTO.eventEndDate > eventInputDTO.eventBeginDate
            ) {
                return new Error("EVENT_ERROR_CODE_01")
            }
            const updatedEventModel: EventModel = await foundedEventModel.update(eventInputDTO as any)
            return new EventOutputDTO(updatedEventModel)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async deleteById(id: number): Promise<EventOutputDTO | Error> {
        try {
            const foundedEventModel: EventModel | null = await EventModel.findByPk(id)
            if (!foundedEventModel) {
                return new Error("EVENT_ERROR_CODE_02")
            }
            await foundedEventModel.destroy()
            return new EventOutputDTO(foundedEventModel)
        }
        catch (error) {
            return new Error(error as string)
        }
    }
}

export default EventCRUD_Service
