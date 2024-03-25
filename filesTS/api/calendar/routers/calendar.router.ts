import * as express from "express"
import {Router} from "express"
import {
    body,
    param
} from "express-validator"
import {CalendarTypeEnum} from "../enums/calendar.enum"
import CalendarController from "../controllers/calendar.controller"

const CalendarRouter: Router = express.Router()

CalendarRouter.post(
    "/create",
    [
        body("user_id").exists().isInt({min: 1}).withMessage(""),
        body("name").exists().isString().notEmpty().withMessage(""),
        body("description").optional().isString().withMessage(""),
        body("type").optional().isIn(Object.values(CalendarTypeEnum)).withMessage("")
    ],
    CalendarController.create
)
CalendarRouter.get(
    "/findById/:id",
    [
        param("id").exists().isInt({min: 1}).withMessage("")
    ],
    CalendarController.findById
)
CalendarRouter.get(
    "/findAllUserCalendars/:user_id",
    [
        param("user_id").exists().isInt({min: 1}).withMessage
    ],
    CalendarController.findAllUserCalendarsByUserId
)
CalendarRouter.get(
    "/findAll",
    CalendarController.findAll
)
CalendarRouter.patch(
    "/updateById/:id",
    [
        param("id").exists().isInt({min: 1}).withMessage(""),
        body("user_id").optional().isInt({min: 1}).withMessage(""),
        body("name").optional().isString().notEmpty().withMessage(""),
        body("description").optional().isString().withMessage(""),
        body("type").optional().isIn(Object.values(CalendarTypeEnum)).withMessage("")
    ],
    CalendarController.updateById
)
CalendarRouter.delete(
    "deleteById:/id",
    [
        param("id").exists().isInt({min: 1}).withMessage("")
    ],
    CalendarController.deleteById
)

export default CalendarRouter
