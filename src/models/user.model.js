import mongoose, { Schema } from "mongoose";
import  Jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  avatar: {
    type: String, //Cloudnary URL
    required: true,
  },

  coverImage: {
    type: String,
  },

  watchHistory: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Video",
    },
  ],

  password:{
    type : String,
    required: [true, 'Password is required']
  },

  refreshToken:{
    type:String
  }
},
{
    timestamps: true,
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password= bcrypt.hash(this.password,10);
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.genrateAccessToken= function(){
  Jwt.sign(
    {
      _id : this._id,
      _email : this.email,
      _username : this.username,
      _fullName : this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
userSchema.methods.genrateRefreshToken= function(){
  Jwt.sign(
    {
      _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}


userSchema.methods.refreshToken = function(){}


export const User = mongoose.model("User", userSchema);
