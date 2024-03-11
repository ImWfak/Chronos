import {userModel} from "../../dbutils/defineModels.js"
import {Op} from "sequelize"
import {genHashPassword} from "../hasher/genHashPassword.js"

class UserCRUD_Service {
    async create(userData) {
        try {
            if (await userModel.findOne({where: {email: userData.email}}) !== null) {
                throw new Error("email")
            }
            if (await userModel.findOne({where: {phoneNumber: userData.phoneNumber}}) !== null) {
                throw new Error("phoneNumber")
            }
            userData.password = await genHashPassword(userData.password)
            userData.verified = false
            userData.creationDate = Date.now()
            return await userModel.create(userData)
        }
        catch (err) {
            throw new Error(err)
        }
    }

    async findById(id) {
        try {
            const foundedUser = await userModel.findOne({where: {id: id}})
            if (!foundedUser) {
                throw new Error("id")
            }
            else {
                return foundedUser
            }
        }
        catch (err) {
            throw new Error(err)
        }
    }

    async findByEmail(email) {
        try {
            const foundedUser = await userModel.findOne({where: {email: email}})
            if (!foundedUser) {
                throw new Error("email")
            }
            else {
                return foundedUser
            }
        }
        catch (err) {
            throw new Error(err)
        }
    }
    async findByPhoneNumber(phoneNumber) {
        try {
            const foundedUser = await userModel.findOne({where: {phoneNumber: phoneNumber}})
            if (!foundedUser) {
                throw new Error("phoneNumber")
            }
            else {
                return foundedUser
            }
        }
        catch (err) {
            throw new Error(err)
        }
    }
    async findAll() {
        try {
            return await userModel.findAll()
        }
        catch (err) {
            throw new Error(err)
        }
    }
    async updateById(id, userData) {
        try {
            const foundedUser = await userModel.findOne({where: {id: id}})
            if (!foundedUser) {
                throw new Error("idweq")
            }
            if (await userModel.findOne({
                where: {
                    email: userData.email,
                    id: {[Op.ne]: id}
                }
            }) !== null) {
                throw new Error("email")
            }
            if (await userModel.findOne({
                where: {
                    phoneNumber: userData.phoneNumber,
                    id: {[Op.ne]: id}
                }
            }) !== null) {
                throw new Error("phoneNumber")
            }
            userData.password = await genHashPassword(userData.password)
            userData.creationDate = foundedUser.creationDate
            userData.updateDate = Date.now()
            await userModel.update(
                userData,
                {where: {id: id}}
            )
            return userData;
        }
        catch (err) {
            throw new Error(err)
        }
    }
    async deleteById(id) {
        try {
            const foundedUser = await userModel.findOne({where: {id: id}})
            if (!foundedUser) {
                throw new Error("id")
            }
            else {
                await userModel.destroy({where: {id: id}})
                return foundedUser
            }
        }
        catch (err) {
            throw new Error(err)
        }
    }
}

export const userCRUD_Service = new UserCRUD_Service()
