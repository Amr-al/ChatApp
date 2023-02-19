import React, { useContext, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { UserContext } from "../App";

export const Singleperson = (item) => {
  const [back, setBack] = useState(false);
  const {setmyfriend} = useContext(UserContext)
  let id = decodeToken(localStorage.getItem("auth")).user[0]._id;
  let handle = async(e)=>{
    let res = await fetch("http://127.0.0.1:3005/chat/getChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users: [item.item._id,id],
      }),
    });
    res = await res.json()
   window.location.replace('http://localhost:3000/message/'+res._id)
  }
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
      onClick={handle}
    >
      <img src={item.item.pic} height={100} width={150}></img>
      <h1> {item.item.name}</h1>
    </div>
  );
};
