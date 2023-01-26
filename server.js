import express from "express"
const app = express()
import cors from "cors"

import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT || 5002

app.use(cors())
app.use(express.json())

//db and authentication
import connectDB from "./db/conn.js"

//routes
import router from "./routes/authRouter.js"
import runsRouter from "./routes/runsRouter.js"
import auth from "./middleware/auth.js"

app.use("/api/v1/auth", router)
app.use("/api/v1/runs", auth, runsRouter)

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
