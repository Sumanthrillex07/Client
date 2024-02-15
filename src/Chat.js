import React, { useEffect, useState } from "react";

const Chat = ({ socket, name, room }) => {
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
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
      await socket.emit("send", msgData);
    }
  };
  useEffect(() => {
    socket.on("receive", async (data) => {
      //   console.log(data);
     await setMsgList((list) => [...list, data]);
    });
    return () => socket.off("receive");
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live chat</p>
      </div>
      <div className="chat-body">
        {msgList.map((msgCt) => {
          return <div>{msgCt.msg}</div>;
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="write.."
          onChange={(event) => {
            setMsg(event.target.value);
          }}
        />
        <button onClick={sendMsg}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
