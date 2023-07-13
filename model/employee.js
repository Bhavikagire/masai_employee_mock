const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type: String,
        required:true,
    },
    email :{
        type: String,
        unique: true,
        required:true,
    },
    department:{
        type: String,
        enum: ["Tech", "Marketing", "Operations"],
        require:true,
    },
    salary : {
        type: Number
    }
});

module.exports = mongoose.model("Employee", employeeSchema)