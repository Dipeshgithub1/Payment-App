const mongoose = require("mongoose");



const userSchema = new mongoose.Schema(
{
    username :{
      type:String,
      unique:true,
      trim:true,
      lowercase:true,
      minlength:3,
      maxlength:30

    },
    password:{
        type:String,
        minlength:6
    },
    firstname:{
        type:String,
        trim:true,
        maxlength:30
    },
    lastname:{
        type:String,
        trim:true,
        maxlength:30
    },
    avatar:{
        type:String
    },
   authProvider: {
    type: String,
    default: "local"
  }
},
{timestamps:true}
);

const User = mongoose.model("User",userSchema)

module.exports = {
  User
}