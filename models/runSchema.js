import mongoose from "mongoose"
// import validator from "validator"
// // import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"

// const {schema} = mongoose;
const Schema = mongoose.Schema

const RunSchema = new Schema({
  runName: {
    type: String,
    required: [true, "name is required"],
    // minlength: [2, "name is too short"],
    // maxlength: [50, "name is too long"],
    trim: true,
  },
  runLocation: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "my city",
  },
  runDistance: {
    type: Number,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
    maxlength: 50,
    default: "nieopłacony",
  },
  whoIsAlsoRunning: {
    type: String,
    maxlength: 150,
    trim: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
})

// export schema

export default mongoose.model("Run", RunSchema) //User 'will create users collection in mongodb'

//create schema

// select:false means password will not be shown when we get all users, but it can be overwritten by using select('+password') in the query
