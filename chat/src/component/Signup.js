import React, { useContext } from "react";
import { UserContext } from "../App";
import Style from '../CSS/signin.module.css'

export const Signup = () => {
  const {signup} = useContext(UserContext) 
  return (
    <div className={Style.Auth_form_container}>
      <form className={Style.Auth_form} onSubmit={signup}>
        <div className={Style.Auth_form_content}>
          <h3 className={Style.Auth_form_title}>Sign up</h3>
          <div className="form-group mt-3">
            <label>User Name</label>
            <input
              type="text"
              name="name"
              className="form-control mt-1"
              placeholder="Enter UserName"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name="password2"
              className="form-control mt-1"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
