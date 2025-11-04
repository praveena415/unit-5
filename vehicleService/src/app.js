const express = require("express")
const app = express()

const connectDB = require("./config/db")

require("dotenv").config()

app.use(express.json())

const customerRoutes = require("./routes/auth.routes")
const bookingRoutes = require("./routes/service.routes")

connectDB()

module.exports = app