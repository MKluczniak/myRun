import Test from "../models/runSchema.js"

import { StatusCodes } from "http-status-codes"
import BadRequestError from "../errors/bad-request.js"

const createRun = async (req, res) => {
  const { name, location } = req.body
  console.log(req.body)
  if (!name || !location) {
    throw new BadRequestError("Please provide all values")
  }

  //   const userAlreadyExists = await User.findOne({ email })
  //   if (userAlreadyExists) {
  //     throw new BadRequestError("Email already in use")
  //   }

  const test = await Test.create({ name, location })

  console.log("test")
  res.status(StatusCodes.CREATED).json({
    test: {
      name: test.name,
      location: test.location,
    },
    // token,
  })
}

export default createRun
