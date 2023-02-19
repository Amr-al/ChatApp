import React, { useContext, useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { UserContext } from "../App";
import { Singleperson } from "./Singleperson";

export const Friends = () => {
  const { token } = useContext(UserContext);
  const [friends, setFriends] = useState(null);
  let id = decodeToken(localStorage.getItem("auth")).user[0]._id;
  let get = async () => {
    let respons = await fetch("http://127.0.0.1:3005/auth/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    let data = await respons.json();
    setFriends(data);
  };
  useEffect(() => {
    get();
  }, []);
  return friends ? (
    <>
      {friends.map((item, i) => {
        //console.log(item.);
        if(item._id != id)
        return (
          <Singleperson item = {item} key ={i} ></Singleperson>
        );
      })}
    </>
  ) : (
    <div>loading... </div>
  );
};
