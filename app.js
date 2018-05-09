const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose= require("mongoose");

const users = require("./routes/users");
const chat = require("./routes/chat");
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

const port = process.env.port || 8090;
//Middileware
app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.use("/users",users);
app.use("/chat",chat);

app.get('/',function(req, res){
    res.send("default/end point");
});
app.get('*',function(req, res){
    res.sendFile(path.join(__dirname,"public/index.html"));
});
server = app.listen(port,function(){
    console.log("Server started on port "+port);
});

var io = require('socket.io')(server);
chatusers =[];
io.on('connection', function(socket){
    socket.on('disconnect',function(){

    });
    socket.on('join',function(user){
        socket.broadcast.emit('updateUsersList',user);
        chatusers[user.id] =socket.id;

    });
    socket.on("show",function(msg){
        io.to(chatusers[msg.to]).emit('new_msg', {msg: msg.msg,msg_from:msg.from});
    })
});