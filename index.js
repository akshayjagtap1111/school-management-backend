const express = require("express");
const cors = require("cors");

const body_parser = require("body-parser")

const mongoose = require("mongoose");
const {register, login} = require("./src/controllers/auth_controller")

const teacher_controller = require("./src/controllers/teacher_controller")
const class_controller = require("./src/controllers/class_controller")

const connect = require("./src/config/db")
const app = express();

app.use(body_parser.json())

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.post("/register",register);

app.post("/login",login);

app.use("/teacher",teacher_controller)
app.use("/class",class_controller)


let  port = process.env.PORT || 3000;
app.use(cors())



app.listen(port,async ()=>{

    connect()

    console.log(`application is listening on port ${port}`)
   
});