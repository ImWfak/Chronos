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

    ],
    CalendarController.create
)
CalendarRouter.get(
    "/findById/:id",
    [

    ],
    CalendarController.findById
)
CalendarRouter.get(
    "/findAllUserCalendars/:user_id",
    [

    ],
    CalendarController.findAllUserCalendars
)
CalendarRouter.get(
    "/findAll",
    [

    ],
    CalendarController.findAll
)
CalendarRouter.patch(
    "/updateById/:id",
    [

    ],
    CalendarController.updateById
)
CalendarRouter.delete(
    "deleteById:/id",
    [

    ],
    CalendarController.deleteById
)

export default CalendarRouter
