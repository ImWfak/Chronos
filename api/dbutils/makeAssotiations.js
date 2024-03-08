import {
    userModel,
    calendarModel
} from "./defineModels.js"

export async function makeAssociations() {
    //========================================USERS
    userModel.hasMany(calendarModel, {
        onDelete: "CASCADE",
        foreignKey: {
            name: "userId"
        }
    })

    //========================================CALENDARS
    calendarModel.belongsTo(userModel)

 //todo there will be more other association between tables in database
}
