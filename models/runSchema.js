import mongoose from "mongoose"
// import validator from "validator"
// // import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"

// const {schema} = mongoose;
const Schema = mongoose.Schema

const RunSchema = new Schema({
  name: {
    type: String,
    required: [true, "nama is required"],
    minlength: [2, "nama is too short"],
    maxlength: [50, "nama is too long"],
    trim: true,
  },

  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "my city",
  },
})

// export schema

export default mongoose.model("Run", RunSchema) //User 'will create users collection in mongodb'

//create schema

// select:false means password will not be shown when we get all users, but it can be overwritten by using select('+password') in the query
