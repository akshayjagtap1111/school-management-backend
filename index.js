const express = require("express");
const cors = require("cors");

const body_parser = require("body-parser")

const mongoose = require("mongoose");
const {register, login} = require("./src/controllers/auth_controller")

const connect = require("./src/config/db")
const app = express();

app.use(body_parser.json())

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.post("/register",register);

app.post("/login",login);


let  port = process.env.PORT || 3000;
app.use(cors())



app.listen(port,async ()=>{

    connect()

    console.log(`application is listening on port ${port}`)
   
});