import * as express from "express"
import {Router} from "express"
import {
    body,
    param
} from "express-validator"
import {UserRegexes} from "../enums/user.regexes"
import {
    UserRemindsAccessibilityEnum,
    InviteToCalendarsAccessibilityEnum,
    InviteToEventsAccessibilityEnum
} from "../enums/user.enums"
import UserController from "../controllers/user.controller"

const UserRouter: Router = express.Router()

UserRouter.post(
    "/create",
    [
        body("email").exists().isString().matches(UserRegexes.EMAIL).withMessage(""),
        body("phone").exists().isString().matches(UserRegexes.PHONE).withMessage(""),
        body("password").exists().isString().matches(UserRegexes.PASSWORD).withMessage(""),
        body("pfp_url").optional().isString().matches(UserRegexes.PFP_URL).withMessage(""),
        body("name").exists().isString().notEmpty().withMessage(""),
        body("surname").exists().isString().notEmpty().withMessage(""),
        body("lastname").optional().isString().withMessage(""),
        body("verified").optional().isBoolean().withMessage(""),
        body("remindsAccessibility").optional().isIn(Object.values(UserRemindsAccessibilityEnum)).withMessage(""),
        body("eventsAccessibility").optional().isIn(Object.values(InviteToEventsAccessibilityEnum)).withMessage(""),
        body("calendarsAccessibility").optional().isIn(Object.values(InviteToCalendarsAccessibilityEnum)).withMessage(""),
        body("creationDate").not().exists().withMessage(""),
        body("updateDate").not().exists().withMessage("")
    ],
    UserController.create
)
UserRouter.get(
    "/findById/:id",
    [
        param("id").exists().isInt({min: 1}).withMessage("")
    ],
    UserController.findById
)
UserRouter.get(
    "/findByEmail/:email",
    [
        param("email").exists().isString().matches(UserRegexes.EMAIL).withMessage("")
    ],
    UserController.findByEmail
)
UserRouter.get(
    "/findByPhone/:phone",
    [
        param("phone").exists().isString().matches(UserRegexes.PHONE).withMessage("")
    ],
    UserController.findByPhone
)
UserRouter.get(
    "/findAll",
    UserController.findAll
)
UserRouter.patch(
    "/updateById/:id",
    [
        param("id").exists().isInt({min: 1}).withMessage(""),
        body("email").optional().isString().matches(UserRegexes.EMAIL).withMessage(""),
        body("phone").optional().isString().matches(UserRegexes.PHONE).withMessage(""),
        body("password").optional().isString().matches(UserRegexes.PASSWORD).withMessage(""),
        body("pfp_url").optional().isString().matches(UserRegexes.PFP_URL).withMessage(""),
        body("name").optional().isString().notEmpty().withMessage(""),
        body("surname").optional().isString().notEmpty().withMessage(""),
        body("lastname").optional().isString().withMessage(""),
        body("verified").optional().isBoolean().withMessage(""),
        body("remindsAccessibility").optional().isIn(Object.values(UserRemindsAccessibilityEnum)).withMessage(""),
        body("eventsAccessibility").optional().isIn(Object.values(InviteToEventsAccessibilityEnum)).withMessage(""),
        body("calendarsAccessibility").optional().isIn(Object.values(InviteToCalendarsAccessibilityEnum)).withMessage(""),
        body("creationDate").not().exists().withMessage(""),
        body("updateDate").not().exists().withMessage("")
    ],
    UserController.updateById
)
UserRouter.delete(
    "/deleteById/:id",
    [
        param("id").exists().isInt({min: 1}).withMessage("")
    ],
    UserController.deleteById
)

export default UserRouter
