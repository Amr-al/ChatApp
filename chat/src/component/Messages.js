import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import { UserContext } from "../App";
import io from "socket.io-client";
let socket;

const Messages = () => {
  const [messages, setmessages] = useState([]);
  const [chatMembers, setchatMembers] = useState([]);
  let id = decodeToken(localStorage.getItem("auth")).user[0]._id;
  const { chatId } = useParams();
  console.log(chatId);
  let get = async () => {
    let res = await fetch("http://127.0.0.1:3005/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId: chatId }),
    });
    let data = await res.json();
    setmessages(data);
  };
  let members = async () => {
    let res = await fetch("http://127.0.0.1:3005/chat/members/" + chatId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    data = data.map((item) => {
      return item.users;
    });
    console.log(data);
    setchatMembers(data);
  };
  useEffect(() => {
    socket = io.connect("http://127.0.0.1:8000");
    socket.emit("join", id);
    get();
    members();
  }, []);
  let handle = async (e) => {
    e.preventDefault();
    let res = await fetch("http://127.0.0.1:3005/message/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: id,
        content: e.target.message.value,
        chatId: chatId,
      }),
    });
    setmessages([
      ...messages,
      { content: e.target.message.value, sender: { _id: id } },
    ]);
    socket.emit("sendMessage", {
      message: e.target.message.value,
      users: chatMembers,
      sender: id,
    });
    res = await res.json();
    await fetch("http://127.0.0.1:3005/message/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageId: res._id, chatId: chatId }),
    });
    e.target.message.value = "";
  };
  useEffect(() => {
    socket.on("sendMessage", (data) => {
      console.log(data);
      // setmessages([
      //   ...messages,
      //   { content: data.message, sender: { _id: data.id } }
      // ]);
      get()
    });
  }, []);

  if (!messages) return <div>loading...</div>;
  else
    return (
      <>
        {messages.map((message, i) => {
          //console.log(message.sender._id, id);
          if (message.sender._id == id) {
            return (
              <h1
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "left",
                  backgroundColor: "blue",
                }}
              >
                {message.content}
              </h1>
            );
          } else {
            return (
              <h1
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "right",
                  backgroundColor: "gray",
                }}
              >
                {message.content}
              </h1>
            );
          }
        })}
        <form
          style={{ width: "100%", border: "10px", borderColor: "black" }}
          onSubmit={handle}
        >
          <input type={"text"} name="message" style={{ width: "95%" }}></input>
          <button type="submit" style={{ width: "5%" }}>
            send
          </button>
        </form>
      </>
    );
};

export default Messages;
