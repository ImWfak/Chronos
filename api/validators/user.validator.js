import {
    body, param
} from "express-validator"
import {
    dateValidator,
    idValidator
} from "./common.validator.js"
import {
    userEmailRegex,
    userPasswordRegex,
    userPFP_UrlRegex, userPhoneNumberRegex
} from "../regexes/user.regex.js"

const emailValidator = [
    body("email")
        .exists().matches(userEmailRegex)
        .isString()
        .withMessage("Wrong value of email, check email regex: " + userEmailRegex)
]

const phoneNumberValidator = [
    body("phoneNumber")
        .exists().matches(userPhoneNumberRegex)
        .isString()
        .withMessage("Wrong value of phoneNumber, check phoneNumber regex: " + userPhoneNumberRegex)
]

export const createValidator = [
    body("password")
        .exists().matches(userPasswordRegex)
        .isString()
        .withMessage("Wrong value of password, check password regex: " + userPasswordRegex),
    body("PFP_Url")
        .optional().matches(userPFP_UrlRegex)
        .isString()
        .withMessage("Wrong value of PFP_Url, check PFP_Url regex: " + userPFP_UrlRegex),
    body("name")
        .exists().notEmpty()
        .isString()
        .withMessage("Wrong value of name, must exist as string and not be empty"),
    body("surname")
        .exists().notEmpty()
        .isString()
        .withMessage("Wrong value of surname, must exist as string and not be empty"),
    body("lastname")
        .optional().notEmpty()
        .isString()
        .withMessage("Wrong value of lastname, must be string and not be empty"),
    body("verified")
        .not().exists()
        .withMessage("Server cant take this value, this field must not be in request")
].concat(emailValidator, phoneNumberValidator, dateValidator)

export const findById = [].concat(idValidator)

export const findByEmail = [
    param("email")
        .exists().matches(userEmailRegex)
        .isString()
        .withMessage("Wrong value of email, check email regex: " + userEmailRegex)
]

export const findByPhoneNumber = [
    param("phoneNumber")
        .exists().matches(userPhoneNumberRegex)
        .isString()
        .withMessage("Wrong value of phoneNumber, check phoneNumber regex: " + userPhoneNumberRegex)
]

export const updateById = [
    body("email")
        .optional().matches(userEmailRegex)
        .isString()
        .withMessage("Wrong value of email, check email regex: " + userEmailRegex),
    body("phoneNumber")
        .optional().matches(userPhoneNumberRegex)
        .isString()
        .withMessage("Wrong value of phoneNumber, check phoneNumber regex: " + userPhoneNumberRegex),
    body("password")
        .optional()
        .matches(userPasswordRegex).isString()
        .withMessage("Wrong value of password, check password regex: " + userPasswordRegex),
    body("PFP_Url")
        .optional().matches(userPFP_UrlRegex)
        .isString()
        .withMessage("Wrong value of PFP_Url, check PFP_Url regex: " + userPFP_UrlRegex),
    body("name")
        .optional().notEmpty()
        .isString()
        .withMessage("Wrong value of name, must be string and not be empty"),
    body("surname")
        .optional().notEmpty()
        .isString()
        .withMessage("Wrong value of surname, must be string and not be empty"),
    body("lastname")
        .optional().notEmpty()
        .isString()
        .withMessage("Wrong value of lastname, must be string and not be empty"),
    body("verified")
        .optional().notEmpty()
        .isBoolean()
        .withMessage("Wrong value of verification, must be boolean and not empty")
].concat(idValidator, dateValidator)

export const deleteById = [].concat(idValidator)
