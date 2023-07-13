const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique : true
    },
    password:{
        type: String,
        required:true,
    },
    confirmPass:{
        type: String,
   
      
    }
});

let UserModel = mongoose.model("User", userSchema)
module.exports = UserModel