import User from "../models/Schema.js"

import { StatusCodes } from "http-status-codes"
import BadRequestError from "../errors/bad-request.js"

// import jwt from "jsonwebtoken"

const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values") //Error or just send ??P
  }
  const userAlreadyExists = await User.findOne({ email })
  if (userAlreadyExists) {
    // throw new BadRequestError("Email already in use")
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Email already in use" })
  }
  const user = await User.create({ name, email, password })

  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token: token,
    },
    location: user.location,
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError("Please provide all values")
  }
  const user = await User.findOne({
    email,
  }).select("+password")
  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid credentials" })
    // throw new BadRequestError("Invalid credentials") // should i use it or not??P
  }
  console.log(user)

  const isPasswordCorrect = await user.comparePassword(password) //user is an instance method so the comparePassword goes to the object and aks get me the password property
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("invalid credentials")
  }

  const token = user.createJWT()

  user.password = undefined // therefore our password wont be included in the response (we could also hardcoded everything in resposne like in the register f.)

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token: token,
    },
  })
}

const updateUser = async (req, res) => {
  const { name, lastName, email, location } = req.body
  if (!name || !email || !lastName || !location) {
    throw new BadRequestError("Please provide all values")
  }

  console.log(req.body)
  const user = await User.findOne({ email: req.body.email })

  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location

  await user.save()

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user, token })
}

export { register, login, updateUser }
