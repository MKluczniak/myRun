import express from "express"
const app = express()
import cors from "cors"

import dotenv from "dotenv"
dotenv.config({ path: "./config.env" })
// require("dotenv").config({ path: "./config.env" })
const port = process.env.PORT || 5002

app.use(cors())
app.use(express.json())

// app.use(require("./routes/record"))

//db and authentication
import connectDB from "./db/conn.js"

// // get driver connection
// const dbo = require("./db/conn")

console.log("hello")
console.log("hello")
console.log("hello")
console.log("hello")

app.get("/", (req, res) => {
  //   throw new Error("dfadfa")
  res.json({ msg: "Hi" })
})

// it will have to be async coz connectDB is going to return a promise
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    //server will spin up only if we are successfull
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err)
//   })
//   console.log(`Server is running on port: ${port}`)
// })
