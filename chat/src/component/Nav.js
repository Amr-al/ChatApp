import React, { useContext } from "react";
import { UserContext } from "../App";

export const Nav = () => {
  const { logout } = useContext(UserContext);
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="/home">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Group">
              Groups
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/friends">
              Friends
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/chats">
              Chats
            </a>
          </li>
          {!localStorage.getItem("auth") ? (
            <>
              <li class="nav-item">
                <a class="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/Register">
                  Signup
                </a>
              </li>
            </>
          ) : (
            <>
              <li class="nav-item">
                <a class="nav-link" href="/profile/">
                  Profile
                </a>
              </li>
              <button type="button" class="btn btn-danger" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
