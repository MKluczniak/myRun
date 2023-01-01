import User from "../models/Schema.js"

import { StatusCodes } from "http-status-codes"
import BadRequestError from "../errors/bad-request.js"

const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values")
  }
  const userAlreadyExists = await User.findOne({ email })
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use")
  }
  const user = await User.create({ name, email, password })

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    // token,
    location: user.location,
  })
}

export default register