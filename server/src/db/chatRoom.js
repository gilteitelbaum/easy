const Joi = require('joi');
const mongoose = require('mongoose');

const ChatRoom = mongoose.model('ChatRoom', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    messages: []
}));

function validateChatRoom(chatRoom) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
    };

    return Joi.validate(chatRoom, schema);
}

exports.ChatRoom = ChatRoom;
exports.validate = validateChatRoom;