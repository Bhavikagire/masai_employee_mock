// const express = require("express")
// const Employee = require("../model/employee");

// const router = express.Router();

const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Employee = require("../model/employee")

const router = express.Router()

router.get("/", async (req, res) => {

    try {
        const employee = await Employee.find()
        res.status(200).json(employee)
    
    } catch (error) {
        console.log("error getting employee", error)
    }

})

router.post("/", async(req, res)=>{
    try {
        
        const {firstName,lastName,email,department,salary} = req.body;

        const newemployee = new Employee({
            firstName,lastName,email,department,salary
        });

        await newemployee.save();
        return  res.status(201).send({"msg":"employee created successfully"})
       
    } catch (error) {
        console.log('Error creating a employee', error);
        
    }

});

router.put("/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const {firstName,lastName,email,department,salary} = req.body

        const updateemp = await Employee.findByIdAndUpdate(
            {_id : id},
            {firstName,lastName,email,department,salary},
            {"new":true}
        );

        if(!updateemp){
            res.send("Employee not found")
        }

        res.status(200).json({"msg":"employee updated"})
    } catch (error) {
        res.status(500).json({"msg":"something erong in updation"})
    }
});

router.delete("/:id", async(req,res)=>{
    try {
        const {id} = req.params;
     
        const deleteemp = await Employee.findByIdAndDelete(
            {_id : id},
        );

        if(!deleteemp){
            res.send("Employee not found")
        }

        res.status(200).json({"msg":"employee deleted"})
    } catch (error) {
        res.status(500).json({"msg":"something erong in updation"})
    }
});

module.exports = router