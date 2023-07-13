const express = require("express")
require('dotenv').config()
const mongoose = require("mongoose")


const app = express()

const userrouter = require("./routes/auth")
const empRouter = require("./routes/emp")


const PORT = process.env.PORT || 3000

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome to masai Employee app")
})




app.use("/user", userrouter)
app.use("/employees", empRouter)
mongoose.connect(process.env.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(()=>{
    console.log("connected to db")
    app.listen(PORT,()=>{
        console.log("server is running at " + PORT)
    });
})

.catch((err)=>{
    console.log("failed connect to db" + err)
})
