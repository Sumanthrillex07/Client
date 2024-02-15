
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
// import onlineIcon from "./icons/closeIcon.png";

let room;

const Chat = ({ socket, name, room }) => {
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [users, setUsers] = useState([]);
  const sendMsg = async () => {
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
      room = msgData.room;
      await socket.emit("send", msgData);
      setMsgList((list) => [...list, msgData]);
      
      setMsg("");
    }
  };
  useEffect(() => {
    socket.on("receive", async (data) => {
      //   console.log(data);
      await setMsgList((list) => [...list, data]);
    //   await setUsers((list) => [...list, data.author]);
    });
    return () => socket.off("receive");
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>ROOM: {room}</p>
        <a href="/">
          X
        </a>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {msgList.map((msgCt) => {
            return (
              <div
                className="message"
                id={name === msgCt.author ? "you" : "other"}
              >
                <div>
                  <div className="msg-cnt">
                    <p>{msgCt.msg}</p>
                  </div>
                  <div className="msg-meta">
                    <p id="time">{msgCt.time}</p>
                    <p id="author">{msgCt.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={msg}
          placeholder="write.."
          onChange={(event) => {
            setMsg(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMsg();
          }}
        />
        <button onClick={sendMsg}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
