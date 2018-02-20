const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose= require("mongoose");

const users = require("./routes/users");
const config = require("./config/database");

//connect db
mongoose.connect(config.database);

mongoose.connection.on("connected",function(){
    console.log("connected to database");
    
});
mongoose.connection.on("error",function(err){
    console.log("Error to database conection "+err);
    
});

const app =express();
const port = process.env.port || 8080;
//Middileware
app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.use("/users",users);

app.get('/',function(req, res){
    res.send("default/end point");
});
app.get('*',function(req, res){
    res.sendFile(path.join(__dirname,"public/index.html"));
});
app.listen(port,function(){
    console.log("Server started on port "+port);
})