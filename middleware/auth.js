import jwt from "jsonwebtoken"
import { UnAuthenticatedError } from "../errors/index.js"

const auth = async (req, res, next) => {
  const headers = req.headers
  const authHeader = req.headers.authorization
  //   console.log(headers)
  // console.log(authHeader)
  console.log("authenticate user middleware")
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid")
  }
  const token = authHeader.split(" ")[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = payload.userId

    next() // next() otherwise the user will be hanging
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid")
  }
}

export default auth
