import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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
    unique: true,
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

//in mongoose docs, here we setting up a middleware "so before we save the doc we want to run some functionality"
UserSchema.pre("save", async function () {
  console.log(this.modifiedPaths()) //returns an array of modified values
  // console.log(this.isModified('name'));
  if (!this.isModified("password")) return

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    // expiresIn: "100",
    expiresIn: process.env.JWT_LIFETIME,
  })
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

// export schema
export default mongoose.model("User", UserSchema) //User will automatically create users collection in mongodb

//we are creating !data model for our user, and we are exporting it so we can use it in other files

// select:false means password will not be shown when we get all users, but it can be overwritten by using select('+password') in the query
