import { React, createContext, useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./component/Signin";
import { Signup } from "./component/Signup";
import { Nav } from "./component/Nav";
import { Home } from "./component/Home";
import { Profile } from "./component/Profile";
import io from "socket.io-client";
import { Friends } from "./component/Friends";
import { Chats } from "./component/Chats";
import SingleChat from "./component/SingleChat";
import { isExpired, decodeToken } from "react-jwt";
import Messages from "./component/Messages";
import Group from "./component/Group";
export const UserContext = createContext();
//const socket = io.connect('http://127.0.0.1:8000')
function App() {
  const [myfriend, setmyfriend] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : null
  );

  let login = async (e) => {
    e.preventDefault();
    console.log("login11111111");
    let response = await fetch("http://127.0.0.1:3005/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    if (response.status == 200) {
      setToken(data);
      localStorage.setItem("auth", JSON.stringify(data));
      window.location.replace("http://localhost:3000/home");
    } else {
      window.location.replace("http://localhost:3000/login");
    }
  };
  let signup = async (e) => {
    e.preventDefault();
    console.log("signuppppp");
    let response = await fetch("http://127.0.0.1:3005/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        name: e.target.name.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    console.log(response.status);
    if (
      response.status == 200 &&
      e.target.password.value === e.target.password2.value
    ) {
      setToken(data);
      localStorage.setItem("auth", JSON.stringify(data));
      window.location.replace("http://localhost:3000/home");
    } else {
      window.location.replace("http://localhost:3000/Register");
    }
  };
  let logout = () => {
    localStorage.clear("auth");
    setToken(null);
    window.location.replace("http://localhost:3000/home");
  };
  let data = {
    token: token,
    login: login,
    signup: signup,
    logout: logout,
    // socket:socket
  };

  return (
    <>
      <UserContext.Provider value={data}>
        <Nav></Nav>
        <BrowserRouter>
          <Routes>
            <Route element={<Home />} path="/home" />
            <Route element={<Group />} path="/Group" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<Friends />} path="/friends" />
            <Route element={<Chats />} path="/chats" />
            <Route path="/message/:chatId" element={<Messages />} />
            <Route element={<Signin />} path="/login" />
            <Route element={<Signup />} path="/Register" />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
