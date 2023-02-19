import React, { useState } from 'react'

export const GroupChat = (props) => {
  const [back, setBack] = useState(false);
  console.log(props);
  let chatId = props.chatId, message = props.message;
  let handel = (e) => {
    window.location.replace("http://localhost:3000/message/" + chatId);
  };
  // console.log(item);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        background: !back ? "white" : "gray",
      }}
      onMouseEnter={() => {
        setBack(!back);
      }}
      onMouseLeave={() => {
        setBack(!back);
      }}
      onClick={handel}
    >
      <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" height={100} width={150}></img>
      {message != "" && (
        <p
          style={{
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          latestMessage: {message}
        </p>
      )}
      <h1> Group chat</h1>
    </div>
  );
}
