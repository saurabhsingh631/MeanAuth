const mongoose = require("mongoose");
const config = require('../config/database');
const User = require("../models/user");

const ChatSchema = mongoose.Schema({
    from_user_id : {
        type:String,
        required: true
    },
    to_user_id : {
        type :String,
        required : true
    },
    msg : {
        type : String,
        required: true
    },
    time : {
        type: Date,
        required: true,
        default : Date.now
    }
});

const Chat = module.exports= mongoose.model("Chat",ChatSchema);

module.exports.getAllUser = function(callback) {
     User.find(callback);
}

module.exports.getChatMessages = function(chat_from, chat_to,callback) {
    query1 = {
        'from_user_id':chat_from,
        'to_user_id' : chat_to
    };
    query2 = {
        'from_user_id':chat_to,
        'to_user_id' : chat_from
    };
    Chat.find({
        $or : [query1,query2]
    },callback);
}

module.exports.addMessage  = function(msg,callback){
    msg.save(callback);
}