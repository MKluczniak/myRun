import express from "express"

import Run from "../models/runSchema.js"
const router = express.Router()

import createRun from "../controllers/runController.js"

// router.route("/test").get((req, res, next) => {
//   res.send("Hello World!")
// })

router.route("/addrun").post(createRun)

router.route("/allruns").get(async (req, res) => {
  const runs = await Run.find()
  console.log(runs)
  res.json({ runs })
})

router.route("/deleterun/:id").delete(async (req, res) => {
  const run = await Run.findByIdAndDelete(req.params.id)
  res.json({ run })
})

export default router
