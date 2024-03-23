import React, { useRef, useState } from "react";
import { NavLink, Link, json, redirect, useNavigate } from "react-router-dom";
import "./Signing.css";
import useFetch from "./useFetch.jsx";

const SignIn = () => {
  const navigate = useNavigate();
  const [comparo, setComparo] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { data, error } = useFetch("https://dummyjson.com/users");
  if (
    !localStorage.getItem("list-user") ||
    localStorage.getItem("list-user") === "undefined"
  ) {
    localStorage.setItem("list-user", data && JSON.stringify(data?.users));
  }

  const handleSignIn = (e) => {
    localStorage.removeItem("logged-user");
    e.preventDefault();
    JSON.parse(localStorage.getItem("list-user")).map((i) => {
      if (i.username == username && i.password == password) {
        console.log("hello");
        setComparo(true);
        localStorage.setItem("logged-user", JSON.stringify(i));
      }
    });
    if (localStorage.getItem("logged-user") !== null) {
      navigate("/");
    } else {
      setComparo(false);
    }
  };

  return (
    <div className="sign-wrap">
      <form className="signing-form">
        <label>Sign in</label>
        <div className="form-nav">
          <NavLink
            to={"/sign-in"}
            className={({ isActive, isPending, isTransitioning }) =>
              isActive
                ? "active"
                : isPending
                ? "pending"
                : isTransitioning
                ? "transitioning"
                : ""
            }
          >
            Sign in
          </NavLink>
          <NavLink
            to={"/sign-up"}
            className={({ isActive, isPending, isTransitioning }) =>
              isActive
                ? "active"
                : isPending
                ? "pending"
                : isTransitioning
                ? "transitioning"
                : ""
            }
          >
            Sign up
          </NavLink>
        </div>
        <div className="input-field">
          <div className="input-name">
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-password">
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <Link className="form-forgot">Forgot password?</Link>
        <div className="form-button">
          <button type="submit" onClick={handleSignIn}>
            Sign in
          </button>
          <p
            className="invalid"
            style={!comparo ? { display: "block" } : { display: "none" }}
          >
            Wrong username or password
          </p>
        </div>
        <div className="form-footer">
          <p>Not a member?&nbsp;</p>
          <Link to={"/sign-up"}>Sign up now</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
