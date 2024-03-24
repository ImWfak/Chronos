//========================================CONNECT_TO_DATABASE
import {sequelize} from "../databaseUtils/connectToDB"
import {createTables} from "../databaseUtils/createTables"
import {createAssociations} from "../databaseUtils/makeAssociations"

sequelize.authenticate().then(function() {
    console.log("Sequelize connected to database")
}).catch(function(error) {
    console.error("Sequelize can`t connect to database")
})
createTables().then(function() {
    console.log("Database has been updated")
})
createAssociations().then(function() {
    console.log("Associations have been created")
})

//========================================CONFIG_SERVER
import * as express from "express"
import * as morgan from "morgan"

const app: express.Application = express()
app.disable("x-powered-by")        //disable express tag
app.use(express.json())                   //enable using json
app.use(morgan("combined"))        //enable logging

//========================================CONNECT_ROUTERS
import UserRouter from "../api/user/routers/user.router"
import CalendarRouter from "../api/calendar/routers/calendar.router"

app.use("/user", UserRouter)
app.use("/calendar", CalendarRouter)

//========================================START_SERVER
import {
    SERVER_PORT,
    SERVER_HOST
} from "../configs/server.config"

app.listen(SERVER_PORT, function() {
    console.log("Server at http://" + SERVER_HOST + ":" + SERVER_PORT)
})
