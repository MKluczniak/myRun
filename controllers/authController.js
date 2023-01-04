import User from "../models/Schema.js"

import { StatusCodes } from "http-status-codes"
import BadRequestError from "../errors/bad-request.js"

// import jwt from "jsonwebtoken"

const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values")
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
    // token,
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
  // const isMatch = await user.matchPassword(password)
  // if (!isMatch) {
  //   throw new BadRequestError("Invalid credentials")
  // }

  const isPasswordCorrect = await user.comparePassword(password) //user is an instance method so the comparePassword goes to the object and aks get me the password property
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("invalid credentials")
  }

  const token = user.createJWT()

  user.password = undefined // therefore our password wont be included in the response (we could also hardcoded everything in resposne like in the register f.)

  res.status(StatusCodes.OK).json({ user, token, location: user.location })

  // res.status(StatusCodes.OK).json({
  //   user: {
  //     email: user.email,
  //     lastName: user.lastName,
  //     location: user.location,
  //     name: user.name,
  //     token: token,
  //   },
  //   // token,
  //   location: user.location,
  // })
}

export { register, login }
