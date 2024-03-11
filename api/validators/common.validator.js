import {
    body,
    param
} from "express-validator"

export const idValidator = [
    param("id")
        .exists()
        .isInt({min: 0})
        .withMessage("Wrong id value, must exist and be bigger than null")
]
export const userIdValidator = [
    body("userId")
        .exists()
        .isInt({min: 0})
        .withMessage("Wrong userId value, must exist and be bigger than null")
]
export const calendarIdValidator = [
    body("calendarId")
        .exists()
        .isInt({min: 0})
        .withMessage("Wrong calendarId value, must exist and be bigger than null")
]
export const eventIdExistsValidator = [
    body("eventId")
        .exists()
        .isInt({min: 0})
        .withMessage("Wrong eventId value, must exist and be bigger than null")
]
export const eventIdOptionalExistValidator = [
    body("eventId")
        .optional()
        .isInt({min: 0})
        .withMessage("Wrong eventId value, must exist and be bigger than null")
]
export const commentIdValidator = [
    body("commentId")
        .optional()
        .isInt({min: 0})
        .withMessage("Wrong commentId value, must exist and be bigger than null")
]
export const dateValidator = [
    body("creationDate")
        .not().exists()
        .withMessage("Server cant take this value, this field must not be in request"),
    body("updateDate")
        .not().exists()
        .withMessage("Server cant take this value, this field must not be in request")
]