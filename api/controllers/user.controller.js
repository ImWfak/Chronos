import {validationResult} from "express-validator"
import {userCRUD_Service} from "../services/CRUD/user.CRUD_Service.js"

class UserController {
    async create(req, res) {
        try {
            const err = await validationResult(req)
            if (!err.isEmpty()) {
                return res.status(400).json({
                    msg: "Validation error",
                    err: err.array()
                })
            }
            const userData = req.body
            const savedUser = await userCRUD_Service.create(userData)
            return res.status(200).json({
                msg: "User has been created",
                savedUser: savedUser
            })
        } catch (err) {
            if (err.message.includes("email")) {
                return res.status(400).json({
                    msg: "User with this email already exist, inputted email: " + req.body.email
                })
            }
            if (err.message.includes("phoneNumber")) {
                return res.status(400).json({
                    msg: "User with this phoneNumber already exist, inputted phoneNumber: " + req.body.phoneNumber
                })
            }
            else {
                return res.status(500).json({
                    msg: "Server can not create user",
                    err: err.message
                })
            }
        }
    }

    async findById(req, res) {
        try {
            const err = await validationResult(req)
            if (!err.isEmpty()) {
                return res.status(400).json({
                    msg: "Validation error",
                    err: err.array()
                })
            }
            const id = req.params.id
            const foundedUser = await userCRUD_Service.findById(id)
            return res.status(200).json({
                msg: "User has been founded",
                foundedUser: foundedUser
            })
        }
        catch (err) {
            if (err.message.includes("id")) {
                return res.status(400).json({
                    msg: "User with this id does not exist, inputted id: " + req.params.id
                })
            }
            else {
                return res.status(500).json({
                    msg: "Server can not find user",
                    err: err.message
                })
            }
        }
    }

    async findByEmail(req, res) {
        try {
            const err = await validationResult(req)
            if (!err.isEmpty()) {
                return res.status(400).json({
                    msg: "Validation error",
                    err: err.array()
                })
            }
            const email = req.params.email
            const foundedUser = await userCRUD_Service.findByEmail(email)
            return res.status(200).json({
                msg: "User has been founded",
                foundedUser: foundedUser
            })
        }
        catch (err) {
            if (err.message.includes("email")) {
                return res.status(400).json({
                    msg: "User with this email does not exist, inputted email: " + req.params.email
                })
            }
            else {
                return res.status(500).json({
                    msg: "Server can not find user",
                    err: err.message
                })
            }
        }
    }

    async findByPhoneNumber(req, res) {
        try {
            const err = await validationResult(req)
            if (!err.isEmpty()) {
                return res.status(400).json({
                    msg: "Validation error",
                    err: err.array()
                })
            }
            const phoneNumber = req.params.phoneNumber
            const foundedUser = await userCRUD_Service.findByPhoneNumber(phoneNumber)
            return res.status(200).json({
                msg: "User has been founded",
                foundedUser: foundedUser
            })
        }
        catch (err) {
            if (err.message.includes("phoneNumber")) {
                return res.status(400).json({
                    msg: "User with this phoneNumber does not exist, inputted phoneNumber: " + req.params.phoneNumber
                })
            }
            else {
                return res.status(500).json({
                    msg: "Server can not find user",
                    err: err.message
                })
            }
        }
    }

    async findAll(req, res) {
        try {
            const foundedUsers = await userCRUD_Service.findAll()
            return res.status(200).json({
                msg: "All users has been found",
                foundedUsers: foundedUsers
            })
        }
        catch (err) {
            return res.status(500).json({
                msg: "Sever can not find user",
                err: err.message
            })
        }
    }

    async updateById(req, res) {
        try {
            const err = await validationResult(req)
            if (!err.isEmpty()) {
                return res.status(400).json({
                    msg: "Validation error",
                    err: err.array()
                })
            }
            const id = req.params.id
            const userData = req.body
            const updatedUser = await userCRUD_Service.updateById(id, userData)
            return res.status(200).json({
                msg: "User has been founded",
                updatedUser: updatedUser
            })
        }
        catch (err) {
            if (err.message.includes("idweq")) {
                return res.status(400).json({
                    msg: "User with this id does not exist, inputted id: " + req.params.id
                })
            }
            if (err.message.includes("email")) {
                return res.status(400).json({
                    msg: "User with this email does not exist, inputted email: " + req.body.email
                })
            }
            if (err.message.includes("phoneNumber")) {
                return res.status(400).json({
                    msg: "User with this phoneNumber does not exist, inputted phoneNumber: " + req.body.phoneNumber
                })
            }
            else {
                return res.status(500).json({
                    msg: "Server can not update user",
                    err: err.message
                })
            }
        }
    }

    async deleteById(req, res) {
        try {
            const err = await validationResult(req)
            if (!err.isEmpty()) {
                return res.status(400).json({
                    msg: "Validation error",
                    err: err.array()
                })
            }
            const id = req.params.id
            const deletedUser = await userCRUD_Service.deleteById(id)
            return res.status(200).json({
                msg: "User has been deleted",
                deletedUser: deletedUser
            })
        }
        catch (err) {
            if (err.message.includes("id")) {
                return res.status(400).json({
                    msg: "User with this id does not exist, inputted id: " + req.params.id
                })
            }
            else {
                return res.status(500).json({
                    msg: "Server can not delete user",
                    err: err.message
                })
            }
        }
    }
}

export const userController = new UserController()
