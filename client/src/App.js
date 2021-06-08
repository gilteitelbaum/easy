import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { AppContext } from "./libs/contextLib";
import { getChats } from "./libs/restcalls";
import Routes from "./Routes";
import "./App.css";

let socket = io("/", {
  path: "/ws",
});

socket.on("connect", () => {
  console.log("Connected to websocket server");
});

function App() {
  const [userName, setUserName] = useState("");
  const [receivedMessage, setReceivedMessage] = useState();
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    socket.on("newmessage", data => {
      console.log("data " + JSON.stringify(data));
    });

    onLoad();
  }, []);

  async function onLoad() {
    try {
      let chats = await getChats();
      setReceivedMessages(chats);
    } catch (e) {
      console.log("unable to load chat messages " + e);
    }
  }

  return (
    <div className="App">
      <AppContext.Provider value={{ userName, setUserName, receivedMessage, receivedMessages }}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
