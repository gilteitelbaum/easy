import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { Redirect } from 'react-router-dom';
import ChatRoomsManager from "./ChatRoomsManager";
import "./Home.css";

export default function Home() {
    const { userName, setUserName } = useAppContext();
    const [user, setUser] = useState(userName);

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("user " + user);
        setUserName(user);

        return <Redirect to="/chatrooms/" />
    }

    console.log("userName " + JSON.stringify(userName) + " " + userName.length);
    return (
        <div className="home">
            {userName.length === 0 && <form onSubmit={handleSubmit}>
                <FormGroup controlId="userName" bsSize="large">
                    <ControlLabel>User Name</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={user}
                        onChange={e => setUser(e.target.value)}
                    />
                </FormGroup>
                <Button block type="submit" bsSize="large">Set User Name</Button>
            </form>}
            {userName.length > 0 && <ChatRoomsManager />}
        </div>
    );
}
