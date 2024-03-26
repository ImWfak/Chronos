import * as express from "express"
import {Router} from "express"
import {
    body,
    param
} from "express-validator"
import {CalendarTypeEnum} from "../enums/calendar.enum"
import CalendarController from "../controllers/calendar.controller"
import {URC_RoleEnum} from "../enums/userRefCalendar.enums"

const CalendarRouter: Router = express.Router()

const idParam = param("id").exists().isInt({min: 1}).withMessage("")
const user_idParam = param("user_id").exists().isInt({min: 1}).withMessage("")
const user_idBody = body("user_id").exists().isInt({min: 1}).withMessage("")

CalendarRouter.post(
    "/createCalendar",
    [
        user_idBody,
        body("name").exists().isString().notEmpty().withMessage(""),
        body("description").optional().isString().withMessage(""),
        body("type").optional().isIn(Object.values(CalendarTypeEnum)).withMessage("")
    ],
    CalendarController.createCalendar
)
CalendarRouter.post(
    "/createURC",
    [
        user_idBody,
        body("calendar_id").exists().isInt({min: 1}).withMessage(""),
        body("URC_RoleEnum").optional().isIn(Object.values(URC_RoleEnum)).withMessage("")
    ],
    CalendarController.createURC
)
CalendarRouter.get(
    "/findCalendarById/:id",
    [idParam],
    CalendarController.findCalendarById
)
CalendarRouter.get(
    "/findURC_ById/:id",
    [idParam],
    CalendarController.findURC_ById
)
CalendarRouter.get(
    "/findAllCalendarsByUserId/:user_id",
    [user_idParam],
    CalendarController.findAllCalendarsByUserId
)
CalendarRouter.get(
    "/findAllURC_ByUserId/:user_id",
    [user_idParam],
    CalendarController.findAllURC_ByUserId
)
CalendarRouter.get(
    "/findAllURC_ByCalendarId/:calendar_id",
    [param("calendar_id").exists().isInt({min: 1}).withMessage("")],
    CalendarController.findAllURC_ByCalendarId
)
CalendarRouter.get(
    "/findAllCalendars",
    CalendarController.findAllCalendars
)
CalendarRouter.get(
        "/findAllURC",
    CalendarController.findAllURC
)
CalendarRouter.patch(
    "/updateCalendarById/:id",
    [
        idParam,
        user_idBody,
        body("name").optional().isString().notEmpty().withMessage(""),
        body("description").optional().isString().withMessage(""),
        body("type").optional().isIn(Object.values(CalendarTypeEnum)).withMessage("")
    ],
    CalendarController.updateCalendarById
)
CalendarRouter.patch(
    "/updateURC_ById/:id",
    [
        idParam,
        user_idBody,
        body("calendar_id").optional().isInt({min: 1}).withMessage(""),
        body("URC_RoleEnum").optional().isIn(Object.values(URC_RoleEnum)).withMessage("")
    ],
    CalendarController.updateURC_ById
)
CalendarRouter.delete(
    "/deleteURC_ById/:id",
    [idParam],
    CalendarController.deleteURC_ById
)
CalendarRouter.delete(
    "/deleteCalendarById/:id",
    [idParam],
    CalendarController.deleteCalendarById
)

export default CalendarRouter
