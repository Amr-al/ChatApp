import React, { useContext, useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";
export const Profile = () => {
  const { token } = useContext(UserContext);
  return (
    <>
      {token && (
        <>
          <img src={decodeToken(token.acessToken).user[0].pic} height={100}></img>
          <h1> {decodeToken(token.acessToken).user[0].name}</h1>
        </>
      )}
    </>
  );
};
