export const UserRegexes = {
    EMAIL: /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
    PHONE: /^\+\d{12}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=]).{8,}$/,
    PFP_URL: /\.\/pfp_urls\/.*(?:\.jpg|\.img)$/
} as const
