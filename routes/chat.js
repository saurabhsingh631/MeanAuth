const express = require("express");
const  router = express.Router();
const config = require("../config/database");
const Chat = require("../models/chat");
router.get('/users',function(req,res,next){
    Chat.getAllUser(function(err,user){
        if(err) {
            res.json({"success":false,msg:"failed"});
        } else {
            res.json({"success":true, users:  user});
        }
    })
})
router.get('/messages/:id',function(req,res,next){
})

router.post('/allmessages',function(req,res,next){
    Chat.getChatMessages(req.body.chat_from, req.body.chat_to,function(err,msg){
        if(err) {
            res.json({"success":false,msg:"failed"});
        } else {
            res.json({"success":true, msgs:  msg});
        }
    })
})

router.post('/addMessage',function(req,res,next){
    var d = new Date();
    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    let msg =  new Chat({
        from_user_id : req.body.from_user_id,
        to_user_id : req.body.to_user_id,
        msg : req.body.msg
    });
    Chat.addMessage(msg,function(err,user){
        if(err) {
            console.log(err);
            res.json({"success":false,msg:"failed"});
        } else {
            res.json({"success":true, msg:"success"});
        }
    })
})

module.exports = router;