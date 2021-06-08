import React from "react";
import "./SingleMessage.css";

export default function SingleMessage(props) {
    function formatDate(date) {
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    }

    console.log("messsage " + JSON.stringify(props.message));

    return (
        <div>
            {props.message && <div className="message">
                <span className="user-field">{props.message.user}</span>
                <span className="message-field">{props.message.message}</span>
                <span className="date-field">{formatDate(props.message.date)}</span>
            </div>}
        </div>
    );
}
