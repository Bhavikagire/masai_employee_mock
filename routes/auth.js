const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../model/user")

const router = express.Router()

router.post("/register", async(req,res)=>{
    try {
        const {email, password, confirmPass} = req.body;

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(409).send('User already exists you can login')
        }

        if(password !== confirmPass){
            return res.status(401).json({'message': 'passwords do not match'})
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = new User({email, password:hashedPassword});
        await newUser.save();

        res.status(200).json({"msg":"user registerd successfully"})
        
    } catch (error) {
        console.log("something wrong", error)
    }
})

router.post("/login", async(req,res)=>{
    try {
        
        const {email, password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({"message": "Invalid email "});
        }

        const passmatch = await bcrypt.compare(password, user.password)
        if (!passmatch ) {
            return res.status(403).json({"message": "Invalid Password!"
        })
    }
        const token = jwt.sign({userID:user._id},"secretkey");
        res.status(200).json({"msg":"log in success", "token":token})
        }
        

     catch (error) {
        console.log("Something went wrong ", error)
        
    }
});

module.exports = router
