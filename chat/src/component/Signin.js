import React, { useContext } from "react";
import { UserContext } from "../App";
import Style from "../CSS/signin.module.css";

export const Signin = () => {
  const {login} = useContext(UserContext)
  return (
    <div className={Style.Auth_form_container}>
      <form className={Style.Auth_form} onSubmit={login}>
        <div className={Style.Auth_form_content}>
          <h3 className={Style.Auth_form_title}>Sign In</h3>
          <div className="form-group mt-3">
            <label>User Name</label>
            <input
              type="text"
              name="name"
              className="form-control mt-1"
              placeholder="Enter User Name"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};
