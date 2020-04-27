const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const config = ("./utils/config")
const notesRouter = require("./controllers/notes")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")

const app = express()

logger.info("Connecting to ", config.MONGODB_URI)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {   // eslint-disable-line no-unused-vars
        logger.info("Connected to MongoDB")
    })
    .catch((error) => {
        logger.error("Error connecting to MongoDB: ", error.message)
    })


app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/notes", notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app