import React, { useState } from "react";

const Chat = ({ socket, name, room }) => {
  const [msg, setMsg] = useState("");
  const sendMsg = () => {
    if (msg !== "") {
      const msgData = {
        room: room,
        author: name,
        msg: msg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
    }
  };
  return (
    <div>
      <div className="chat-header">
        <p>Live chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="write.."
          onChange={(event) => {
            setMsg(event.target.value);
          }}
        />
        <button>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
