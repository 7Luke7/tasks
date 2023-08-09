const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
const port = 5001
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/tasks", require("./routes"))

mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
}).catch(err => console.log(err))