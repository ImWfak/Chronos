import express from "express"
import {userController} from "../controllers/user.controller.js"
import {
    createValidator,
    findByEmail,
    findById,
    findByPhoneNumber,
    updateById,
    deleteById
} from "../validators/user.validator.js"

//todo there will be middlewares for role access check

const userRouter = express.Router()
userRouter.post(
    "/create",
    createValidator,
    userController.create
)
userRouter.get(
    "/findById/:id",
    findById,
    userController.findById
)
userRouter.get(
    "/findByEmail/:email",
    findByEmail,
    userController.findByEmail
)
userRouter.get(
    "/findByPhoneNumber/:phoneNumber",
    findByPhoneNumber,
    userController.findByPhoneNumber
)
userRouter.get(
    "/findAll",
    userController.findAll
)
userRouter.patch(
    "/updateById/:id",
    updateById,
    userController.updateById
)
userRouter.delete(
    "/deleteById/:id",
    deleteById,
    userController.deleteById
)

export default userRouter
