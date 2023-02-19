import React, { useState } from "react";

export default function SingleChat({ item, message, cahtId }) {
  const [back, setBack] = useState(false);
  let handel = (e) => {
    window.location.replace("http://localhost:3000/message/" + cahtId);
  };
 // console.log(message);
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
      <img src={item.pic} height={100} width={150}></img>
      {message !='' &&
        <p
        style={{
          marginTop: "auto",
          marginBottom: "auto",
        }}
      >
        latestMessage: {message}
      </p>
}
      <h1> {item.name}</h1>
    </div>
  );
}
