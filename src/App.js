import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");
function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join", room);
    }
  };
  return (
    <div className="App">
      <h3>Join Chat</h3>
      <input
        type="text"
        placeholder="Name"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room ID"
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Start Chat</button>
      <Chat socket={socket} name={name} room={room} />
    </div>
  );
}

export default App;
