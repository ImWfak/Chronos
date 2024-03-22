import UserModel from "../api/user/model/user.model"

export async function createTables() {
    try {
        await UserModel.sync({alter: true})
    }
    catch (error) {
        console.error("Error of creating tables: ", error)
    }
}
