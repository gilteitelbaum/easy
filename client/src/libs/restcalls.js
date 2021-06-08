import axios from 'axios';

export async function getChats() {
    const data = await axios.get("http://localhost:3000/api/chatrooms");
    return data;
}

export async function sendMessage(chatRoomName, message) {
    const data = await axios.put("http://localhost:3000/api/chatrooms/" + chatRoomName, message);
    return data;
}

export async function addChatRoom(chatRoomName) {
    await axios.post("http://localhost:3000/api/chatrooms/", { name: chatRoomName });
}