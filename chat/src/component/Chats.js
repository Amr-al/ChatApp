import React, { useEffect, useState } from 'react'
import { isExpired, decodeToken } from "react-jwt";
import SingleChat from './SingleChat';
import { Singleperson } from './Singleperson';
import {GroupChat} from './GroupChat'
export const Chats = () => {
  const [chats,setChats] = useState(null)
  let id = decodeToken(localStorage.getItem("auth")).user[0]._id;
  let get = async()=>{
    let respons = await fetch("http://127.0.0.1:3005/chat/allChats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    let data = await respons.json();
   // console.log(data);
    setChats(data);
  }
  useEffect(()=>{
    get()
  },[])
  return (
    <div>
      {
        chats && (
          chats.map((item ,i ) => {
            let message = ''
            console.log(item._id);
            if(item.latestMessage) message = item.latestMessage.content;
            if(item.users.length > 2) return <GroupChat  message={message}  chatId = {item._id} key = {i}></GroupChat>
            else if(item.users[1]._id == id){
              return <SingleChat item = {item.users[0]} message={message}  cahtId = {item._id} key = {i}></SingleChat>
            }
            else{
              return <SingleChat item = {item.users[1]} message={message}  cahtId = {item._id} key = {i}></SingleChat>
            }
            
          })
        )
      }
    </div>
  )
}
