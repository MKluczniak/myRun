import express from "express"
const app = express()
import cors from "cors"

import dotenv from "dotenv"
dotenv.config()
// dotenv.config({ path: "./config.env" })
// require("dotenv").config({ path: "./config.env" })
const port = process.env.PORT || 5002

app.use(cors())
app.use(express.json())

//db and authentication
import connectDB from "./db/conn.js"

//routes
import router from "./routes/authRouter.js"
import runsRouter from "./routes/runsRouter.js"

app.use("/api/v1/auth", router)
app.use("/api/v1/runs", runsRouter)

// app.get('/addrun', (req, res)=>{

// })

app.get("/", (req, res) => {
  //   throw new Error("dfadfa")
  res.json({ msg: "Hi" })
})

// it will have to be async coz connectDB is going to return a promise
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    //server will spin up only if we are successful
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
