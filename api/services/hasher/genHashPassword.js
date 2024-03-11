import bcrypt from "bcrypt"

export async function genHashPassword(password) {
    const salt = await bcrypt.genSalt(15)
    return await bcrypt.hash(password, salt)
}
