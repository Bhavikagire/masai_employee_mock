const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

const userrouter = require("./routes/auth");
const empRouter = require("./routes/emp");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Masai Employee app");
});

app.use("/user", userrouter);
app.use("/employees", empRouter);

mongoose
  .connect(process.env.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log("Server is running at port " + PORT);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to the database: " + err);
  });
