import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");
function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [bool, setBool] = useState(false);
  const [users, setUsers] = useState([]);

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join", room);
      setUsers((list) => [...list, name]);
      // socket.emit("identity", name);
      // socket.on("identity",name=()=>{})
      setBool(true);
    }
  };
  return (
    <div className="App">
      {!bool ? (
        <div className="chatContainer">
          <h3>ChitChat</h3>
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
          <button onClick={joinRoom}>Start Chatting</button>
        </div>
      ) : (
        <Chat socket={socket} name={name} room={room} />
      )}
    </div>
  );
}

export default App;
