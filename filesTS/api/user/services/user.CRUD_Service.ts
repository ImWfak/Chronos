import UserInputDTO from "../DTOs/user.inputDTO"
import UserOutputDTO from "../DTOs/user.outputDTO"
import UserModel from "../models/user.model"
import * as bcrypt from "bcrypt"
import {Op} from "sequelize"

class UserCRUD_Service {
    public static async create(userInputDTO: UserInputDTO): Promise<UserOutputDTO | Error> {
        try {
            if (await UserModel.findOne({where: {email: userInputDTO.email}})) {
                return new Error("API_ERROR_CODE_004")
            }
            if (await UserModel.findOne({where: {phone: userInputDTO.phone}})) {
                return new Error("API_ERROR_CODE_005")
            }
            userInputDTO.password = await bcrypt.hash(userInputDTO.password, await bcrypt.genSalt(10))
            const savedUserModel: UserModel = await UserModel.create(userInputDTO as any)
            return new UserOutputDTO(savedUserModel)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findById(id: number): Promise<UserOutputDTO | Error> {
        try {
            const foundedUserModel: UserModel | null = await UserModel.findByPk(id)
            if (!foundedUserModel) {
                return new Error("API_ERROR_CODE_001")
            }
            return new UserOutputDTO(foundedUserModel)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findByEmail(email: string): Promise<UserOutputDTO | Error> {
        try {
            const foundedUserModel: UserModel | null = await UserModel.findOne({where: {email: email}})
            if (!foundedUserModel) {
                return new Error("API_ERROR_CODE_002")
            }
            return new UserOutputDTO(foundedUserModel)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findByPhone(phone: string): Promise<UserOutputDTO | Error> {
        try {
            const foundedUserModel: UserModel | null = await UserModel.findOne({where: {phone: phone}})
            if (!foundedUserModel) {
                return new Error("API_ERROR_CODE_003")
            }
            return new UserOutputDTO(foundedUserModel)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async findAll(): Promise<UserOutputDTO[] | Error> {
        try {
            const allFoundedUserModels: UserModel[] = await UserModel.findAll()
            const allUsersOutputDTOs: UserOutputDTO[] = []
            allFoundedUserModels.forEach(
                function (foundedUserModel: UserModel) {
                    allUsersOutputDTOs.push(new UserOutputDTO(foundedUserModel))
                }
            )
            if (allUsersOutputDTOs.length === 0) {
                return new Error("API_ERROR_CODE_006")
            }
            return allUsersOutputDTOs
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async updateById(
        id: number,
        userInputDTO: UserInputDTO
    ): Promise<UserOutputDTO | Error> {
        try {
            const foundedUserModel: UserModel | null = await UserModel.findByPk(id)
            if (!foundedUserModel) {
                return new Error("API_ERROR_CODE_001")
            }
            if (userInputDTO.email !== null &&
                userInputDTO.email !== undefined &&
                await UserModel.findOne({
                    where: {
                        email: userInputDTO.email,
                        id: {[Op.ne]: id}
                    }
                })
            ) {
                return new Error("API_ERROR_CODE_004")
            }
            if (userInputDTO.phone !== null &&
                userInputDTO.phone !== undefined &&
                await UserModel.findOne({
                    where: {
                        phone: userInputDTO.phone,
                        id: {[Op.ne]: id}
                    }
                })
            ) {
                return new Error("API_ERROR_CODE_005")
            }
            userInputDTO.password = await bcrypt.hash(userInputDTO.password, await bcrypt.genSalt(10))
            const updatedUserModel: UserModel = await foundedUserModel.update(userInputDTO as any)
            return new UserOutputDTO(updatedUserModel)
        }
        catch (error) {
            return new Error(error as string)
        }
    }

    public static async deleteById(id: number): Promise<UserOutputDTO | Error> {
        try {
            const foundedUserModel: UserModel | null = await UserModel.findByPk(id)
            if (!foundedUserModel) {
                return new Error("API_ERROR_CODE_001")
            }
            await foundedUserModel.destroy()
            return new UserOutputDTO(foundedUserModel)
        }
        catch (error) {
            return new Error(error as string)
        }
    }
}

export default UserCRUD_Service
