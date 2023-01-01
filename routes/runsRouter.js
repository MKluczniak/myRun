import express from "express"

const router = express.Router()

import createRun from "../controllers/runController.js"

// router.route("/test").get((req, res, next) => {
//   res.send("Hello World!")
// })

router.route("/addrun").get(createRun)

export default router
