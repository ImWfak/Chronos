import {
    Model,
    CreationOptional,
    DataTypes
} from "sequelize"
import {UserRegexes} from "../enums/user.regexes"
import {
    UserRemindsAccessibilityEnum,
    InviteToCalendarsAccessibilityEnum,
    InviteToEventsAccessibilityEnum
} from "../enums/user.enums"
import {sequelize} from "../../../databaseUtils/connectToDB"

interface UserModelFields {
    id: CreationOptional<number>
    email: string
    phone: string
    password: string
    pfp_url: CreationOptional<string>
    name: string
    surname: string
    lastname: CreationOptional<string | null>
    verified: CreationOptional<boolean>
    remindsAccessibility: CreationOptional<UserRemindsAccessibilityEnum>
    eventsAccessibility: CreationOptional<InviteToEventsAccessibilityEnum>
    calendarsAccessibility: CreationOptional<InviteToCalendarsAccessibilityEnum>
    creationDate: CreationOptional<number>
    updateDate: CreationOptional<number | null>
}

class UserModel extends Model<UserModelFields> implements UserModelFields {
    declare id: CreationOptional<number>
    declare email: string
    declare phone: string
    declare password: string
    declare pfp_url: CreationOptional<string>
    declare name: string
    declare surname: string
    declare lastname: CreationOptional<string | null>
    declare verified: CreationOptional<boolean>
    declare remindsAccessibility: CreationOptional<UserRemindsAccessibilityEnum>
    declare eventsAccessibility: CreationOptional<InviteToEventsAccessibilityEnum>
    declare calendarsAccessibility: CreationOptional<InviteToCalendarsAccessibilityEnum>
    declare creationDate: CreationOptional<number>
    declare updateDate: CreationOptional<number | null>
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                function(inputtedEmail: string) {
                    if (!UserRegexes.EMAIL.test(inputtedEmail)) {
                        throw new Error("Email validation error, inputted email: " + inputtedEmail)
                    }
                }
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                function(inputtedPhone: string) {
                    if (!UserRegexes.PHONE.test(inputtedPhone)) {
                        throw new Error("Phone validation error, inputted phone: " + inputtedPhone)
                    }
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            validate: {
                function(inputtedPassword: string) {
                    if (!UserRegexes.PASSWORD.test(inputtedPassword)) {
                        throw new Error("Password validation error, inputted password: " + inputtedPassword)
                    }
                }
            }
        },
        pfp_url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            defaultValue: "./pfp_urls/defaultImage.jpg",
            validate: {
                function(inputted_pfp_url: string) {
                    if (!UserRegexes.PFP_URL.test(inputted_pfp_url)) {
                        //throw new Error("pfp_url validation error, inputted pfp_url: " + inputted_pfp_url)
                        return "./pfp_urls/defaultImage.jpg"
                    }
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
            defaultValue: null
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: false,
            defaultValue: false
        },
        remindsAccessibility: {
            type: DataTypes.ENUM(
                ...Object.values(UserRemindsAccessibilityEnum).map(value => value.toString())
            ),
            allowNull: false,
            unique: false,
            defaultValue: UserRemindsAccessibilityEnum.EASY_HIGHER
        },
        eventsAccessibility: {
            type: DataTypes.ENUM(
                ...Object.values(InviteToEventsAccessibilityEnum).map(value => value.toString())
            ),
            allowNull: false,
            unique: false,
            defaultValue: InviteToEventsAccessibilityEnum.ALL_INVITES
        },
        calendarsAccessibility: {
            type: DataTypes.ENUM(
                ...Object.values(InviteToCalendarsAccessibilityEnum).map(value => value.toString())
            ),
            allowNull: false,
            unique: false,
            defaultValue: InviteToCalendarsAccessibilityEnum.ALL_INVITES
        },
        creationDate: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: false,
            defaultValue: Date.now()
        },
        updateDate: {
            type: DataTypes.BIGINT,
            allowNull: true,
            unique: false,
            defaultValue: null,
            validate: {
                function(inputtedUpdateDate: number) {
                    if (inputtedUpdateDate && this.creationDate && inputtedUpdateDate < this.creationDate) {
                        throw new Error("UpdateDate validation error, creationDate can not be bigger than updateDate, inputted updateDate: " + inputtedUpdateDate)
                    }
                }
            }
        }
    },
    {
        sequelize,
        tableName: "users"
    }
)

export default UserModel
