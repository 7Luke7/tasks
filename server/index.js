const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
const PORT = process.env.PORT || 5000;
const cors = require("cors")

app.use(cors(
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/tasks", require("./routes"))

mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
}).catch(err => console.log(err))
