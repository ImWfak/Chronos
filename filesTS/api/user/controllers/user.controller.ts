import {
    Request,
    Response
} from "express"
import {validationResult} from "express-validator"
import UserInputDTO from "../DTOs/user.inputDTO"
import UserOutputDTO from "../DTOs/user.outputDTO"
import UserCRUD_Service from "../services/user.CRUD_Service"

class UserController {
    public static async create(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                errors: error.array()
            })
        }
        const userInputDTO: UserInputDTO = new UserInputDTO(request.body as ReadableStream<Uint8Array>)
        const result: UserOutputDTO | Error = await UserCRUD_Service.create(userInputDTO)
        if (result instanceof Error) {
            if (result.message.includes("API_ERROR_CODE_004")) {
                return response.status(400).json({
                    message: "User with this email already exist, inputted email: " + userInputDTO.email
                })
            }
            if (result.message.includes("API_ERROR_CODE_005")) {
                return response.status(400).json({
                    message: "User with this phone already exist, inputted phone: " + userInputDTO.phone
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not create user",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "User has been created",
                createdUser: result
            })
        }
    }

    public static async findById(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                errors: error.array()
            })
        }
        const id: number = Number(request.params.id)
        const result: UserOutputDTO | Error = await UserCRUD_Service.findById(id)
        if (result instanceof Error) {
            if (result.message.includes("API_ERROR_CODE_001")) {
                return response.status(400).json({
                    message: "User with this id does not exist, inputted id: " + id
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not find user by id",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "User has been founded by id",
                foundedUser: result
            })
        }
    }

    public static async findByEmail(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                errors: error.array()
            })
        }
        const email: string = request.params.email
        const result: UserOutputDTO | Error = await UserCRUD_Service.findByEmail(email)
        if (result instanceof Error) {
            if (result.message.includes("API_ERROR_CODE_002")) {
                return response.status(400).json({
                    message: "User with this email does not exist, inputted email: " + email
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not find user by email",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "User has been founded by email",
                foundedUser: result
            })
        }
    }

    public static async findByPhone(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                errors: error.array()
            })
        }
        const phone: string = request.params.phone
        const result: UserOutputDTO | Error = await UserCRUD_Service.findByPhone(phone)
        if (result instanceof Error) {
            if (result.message.includes("API_ERROR_CODE_003")) {
                return response.status(400).json({
                    message: "User with this phone does not exist, inputted phone: " + phone
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not find user by phone",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "User has been found by phone",
                foundedUser: result
            })
        }
    }

    public static async findAll(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                errors: error.array()
            })
        }
        const result: UserOutputDTO[] | Error = await UserCRUD_Service.findAll()
        if (result instanceof Error) {
            if (result.message.includes("API_ERROR_CODE_006")) {
                return response.status(400).json({
                    message: "Any user exist in database"
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not find all users",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "All users have been founded",
                allFoundedUsers: result
            })
        }
    }

    public static async updateById(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                errors: error.array()
            })
        }
        const id: number = Number(request.params.id)
        const userInputDTO: UserInputDTO = new UserInputDTO(request.body as ReadableStream<Uint8Array>)
        const result: UserOutputDTO | Error = await UserCRUD_Service.updateById(id, userInputDTO)
        if (result instanceof Error) {
            if (result.message.includes("API_ERROR_CODE_001")) {
                return response.status(400).json({
                    message: "User with this id does not exist, inputted id: " + id
                })
            }
            if (result.message.includes("API_ERROR_CODE_004")) {
                return response.status(400).json({
                    message: "User with this email already exist, inputted email: " + userInputDTO.email
                })
            }
            if (result.message.includes("API_ERROR_CODE_005")) {
                return response.status(400).json({
                    message: "User with this phone already exist, inputted phone: " + userInputDTO.phone
                })
            }
            else {
                return response.status(400).json({
                    message: "Server can not update user by id",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "User has been updated by id",
                updatedUser: result
            })
        }
    }

    public static async deleteById(request: Request, response: Response) {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return response.status(400).json({
                errors: error.array()
            })
        }
        const id: number = Number(request.params.id)
        const result: UserOutputDTO | Error = await UserCRUD_Service.deleteById(id)
        if (result instanceof Error) {
            if (result.message.includes("API_ERROR_CODE_001")) {
                return response.status(400).json({
                    message: "User with this id does not exist, inputted id: " + id
                })
            }
            else {
                return response.status(500).json({
                    message: "Server can not delete user by id",
                    error: result.message
                })
            }
        }
        else {
            return response.status(200).json({
                message: "User has been deleted by id",
                updatedUser: result
            })
        }
    }
}

export default UserController
