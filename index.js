const express = require("express");
const cors = require("cors");

const body_parser = require("body-parser")

const mongoose = require("mongoose");

const connect = require("./src/config/db")
const app = express();

app.use(body_parser.json())




let  port = process.env.PORT || 3000;
app.use(cors())



app.listen(port,async ()=>{

    connect()

    console.log(`application is listening on port ${port}`)
   
});