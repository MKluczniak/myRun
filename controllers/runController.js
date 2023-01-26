import Run from "../models/runSchema.js"

import { StatusCodes } from "http-status-codes"
import BadRequestError from "../errors/bad-request.js"

const createRun = async (req, res) => {
  const { runName, runLocation, runDistance, status, whoIsAlsoRunning } =
    req.body
  console.log(req.body)
  if (!runName || !runLocation || !runDistance || !status) {
    throw new BadRequestError("Please provide all values")
  }

  //   const userAlreadyExists = await User.findOne({ email })
  //   if (userAlreadyExists) {
  //     throw new BadRequestError("Email already in use")
  //   }

  const run = await Run.create({
    runName,
    runDistance,
    runLocation,
    status,
    whoIsAlsoRunning,
    userId: req.userId,
  })

  console.log("test")
  res.status(StatusCodes.CREATED).json({
    run: {
      runName: run.name,
      runLocation: run.location,
      runDistance: run.distance,
      status: run.status,
      whoIsAlsoRunning: run.whoIsAlsoRunning,
    },
  })
}

export default createRun
