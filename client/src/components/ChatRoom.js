import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Messages from "./Messages";
import { sendMessage, addChatRoom } from "../libs/restcalls";
import { useAppContext } from "../libs/contextLib";

import "./ChatRoom.css";

export default function ChatRoom(props) {
    const [editMessage, setEditMessage] = useState("");
    const [displayMessages, setDisplayMessages] = useState(props.messages);
    const { receivedMessage, userName } = useAppContext();

    async function handleSubmit(event) {
        event.preventDefault();
        if (!displayMessages) {
            try {
                await addChatRoom(props.name);
            } catch (e) {
                // dont do anything - this is ok
            }
        }
        await sendMessage(props.name, { user: userName, message: editMessage });
    }

    useEffect(() => {
        // Otherwise this is for a different chat window and we ignore it
        if (receivedMessage && receivedMessage.name === props.name) {
            let tempMessages = [...displayMessages];
            tempMessages.push({ user: receivedMessage.name, date: receivedMessage.date, message: receivedMessage.message });
            setDisplayMessages(tempMessages);
        }
    }, [receivedMessage]);


    return (
        <div className="chat-window">
            <h1>{props.name}</h1>
            <hr></hr>
            <Messages messages={displayMessages ? displayMessages : props.messages} />
            <div>
                <form className="message-sender" onSubmit={handleSubmit}>
                    <FormGroup controlId="text-message" bsSize="large">
                        <ControlLabel>Message</ControlLabel>
                        <FormControl autoFocus type="text" value={editMessage} onChange={e => setEditMessage(e.target.value)} />
                    </FormGroup>
                    <Button block type="submit" bsSize="large">Send Message</Button>
                </form>
            </div>
        </div>
    );
}
