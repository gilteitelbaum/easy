import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import ChatRoom from "./ChatRoom";
import "./ChatRoomsManager.css";

export default function ChatRoomsManager() {
    const { receivedMessages } = useAppContext();
    const [chatRoomMessages, setChatRoomMessages] = useState(receivedMessages);

    const chatRoomName = "Main Chat Room"; // Ran out of time - right now we use only one chat room

    useEffect(() => {
        if (receivedMessages && receivedMessages.data && receivedMessages.data.length > 0) {
            let messagesForThisRoom = receivedMessages.data[0]; // right now we only have one room
            if (messagesForThisRoom) {
                setChatRoomMessages(messagesForThisRoom);
            }
        }
    }, [receivedMessages]);


    return (
        <div className="chat-room-manager">
            <ChatRoom messages={chatRoomMessages.messages} name={chatRoomName} />
        </div>
    );
}
