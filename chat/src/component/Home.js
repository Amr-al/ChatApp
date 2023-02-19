import React, { useContext } from "react";
import { UserContext } from "../App";
import { isExpired, decodeToken } from "react-jwt";

export const Home = () => {
  const { token } = useContext(UserContext);
  return (
    <>
      {localStorage.getItem("auth") ? (
        <h1><b>Hello {decodeToken(localStorage.getItem("auth")).user[0].name}</b></h1>
      ):(<h1><b>welcome to Our Page</b></h1>)}
    </>
  );
};
