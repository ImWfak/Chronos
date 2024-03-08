import {DataTypes} from "sequelize"
import {
    userEmailRegex,
    userPhoneNumberRegex,
    userPasswordRegex,
    userPFP_UrlRegex
} from "../regexes/user.regex.js"

export const undefUserModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    email: {
        type: DataTypes.STRING,
        notNull: true,
        unique: true,
        validate: {
            customValidator(inputEmail) {
                if (!userEmailRegex.test(inputEmail)) {
                    throw new Error(
                        "Wrong email value"
                        + "\nCheck regex: " + userEmailRegex
                        + "\nInputted value: " + inputEmail
                    )
                }
            }
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        notNull: true,
        unique: true,
        validate: {
            customValidator(inputPhoneNumber) {
                if (!userPhoneNumberRegex.test(inputPhoneNumber)) {
                    throw new Error(
                        "Wrong email value"
                        + "\nCheck regex: " + userPhoneNumberRegex
                        + "\nInputted value: " + inputPhoneNumber
                    )
                }
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        notNull: true,
        validate: {
            customValidator(inputPassword) {
                if (!userPasswordRegex.test(inputPassword)) {
                    throw new Error(
                        "Wrong password value"
                        + "\nCheck regex: " + userPasswordRegex
                        + "\nInputted value: " + inputPassword
                    )
                }
            }
        }
    },
    PFP_Url: {
        type: DataTypes.STRING,
        notNull: true,
        defaultValue: function() {
            return "./PFPs/default.png"
        },
        validate: {
            customValidator(inputPFP_Url) {
                if (userPFP_UrlRegex.test(inputPFP_Url)) {
                    throw new Error(
                        "Wrong PFP url value"
                        + "\n Check regex: " + userPFP_UrlRegex
                        + "\nInputted value: " + inputPFP_Url
                    )
                }
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        notNull: true
    },
    surname: {
        type: DataTypes.STRING,
        notNull: true
    },
    lastname: {
        type: DataTypes.STRING,
        notNull: true
    },
    verified: {
        type: DataTypes.BOOLEAN,
        notNull: true,
        defaultValue: function() {
            return false
        }
    },
    creationDate: {
        type: DataTypes.BIGINT,
        defaultValue: function () {
            return Date.now()
        }
    },
    updateDate: {
        type: DataTypes.BIGINT,
        defaultValue: null,
        validate: {
            customValidator(inputUpdateDate) {
                if (inputUpdateDate < this.creationDate) {
                    throw new Error(
                        "Wrong updateDate value"
                        + "\nUpdateDate value must be bigger than creationDate value: " + this.creationDate
                        + "\nInputted value of updateDate: " + inputUpdateDate)
                }
            }
        }
    }
}
