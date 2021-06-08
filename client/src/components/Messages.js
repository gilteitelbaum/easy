import React from "react";
import SingleMessage from "./SingleMessage";
import "./Messages.css";

export default function Messages(props) {
    return (
        <div className="hold-messages">
            {props.messages && props.messages.map(message => {
                <SingleMessage message={message} />
            })}
        </div>
    );
}