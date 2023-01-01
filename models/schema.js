import mongoose from "mongoose"
import validator from "validator"
// import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"

// const {schema} = mongoose;
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "nama is required"],
    minlength: [3, "nama is too short"],
    maxlength: [20, "nama is too long"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    validate: {
      validator: validator.isEmail,
      message: "email is not valid, please check again",
    },
    unique: false,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "password is too short"],
    maxlength: [100, "password is too long"],
    select: false,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "Last Name",
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "my city",
  },
})

// export schema

export default mongoose.model("User", UserSchema) //User 'will create users collection in mangodb'

//create schema

// select:false means password will not be shown when we get all users, but it can be overwritten by using select('+password') in the query
