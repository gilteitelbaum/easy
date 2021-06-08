const { ChatRoom, validate } = require('../db/chatRoom');
const express = require('express');
const router = express.Router();

router.get('/:name', async (req, res) => {
    // Normally we would do this by id
    const chatRoom = await ChatRoom.find({ name: req.params.name });

    if (!chatRoom) return res.status(404).send('The chat room with the given ID was not found.');

    res.send(chatRoom);
});

router.get('/', async (req, res) => {
    const chatRooms = await ChatRoom.find().sort('name');
    res.send(chatRooms);
});


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let existingChatRoom = await ChatRoom.findOne({ name: req.body.name });
    if (existingChatRoom) return res.status(400).send('chatroom already exists');

    let chatRoom = new ChatRoom({
        name: req.body.name,
        messages: []
    });
    chatRoom = await chatRoom.save();

    res.send(chatRoom);
});

router.put('/:name', async (req, res) => {
    if (!req.param.name) return res.status(400).send('invalid chat room name');
    if (!req.body.user || !req.body.message) return res.status(400).send('invalid user or message');

    let chatRoom = await ChatRoom.findOne({ name: req.params.name });
    if (!chatRoom) return res.status(404).send('The customer with the given ID was not found.');
    const newMessage = { user: req.body.user, message: req.body.message, date: Date.now() };
    chatRoom.messages.push(newMessage);

    await chatRoom.save();

    req.app.locals.io.emit("newmesssage", "testing 1 2 3 4");

    res.send(newMessage);
});


module.exports = router;

