import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Signing.css";
import useFetch from "./useFetch";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");

  const { data, error } = useFetch("https://dummyjson.com/users");
  if (
    !localStorage.getItem("list-user") ||
    localStorage.getItem("list-user") === "undefined"
  ) {
    localStorage.setItem("list-user", data && JSON.stringify(data?.users));
  }

  const register = (username, password, id) => {
    try {
      fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          data.id = id;
          let dataUser = localStorage.getItem("list-user") || [];
          localStorage.setItem(
            "list-user",
            JSON.stringify([...JSON.parse(dataUser), data])
          );
          localStorage.setItem("logged-user", JSON.stringify(data));
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (username == "" || password == "" || repeatPassword != password) {
      setInvalid(true);
    } else {
      setInvalid(false);
      register(
        username,
        password,
        JSON.parse(localStorage.getItem("list-user"))[
          JSON.parse(localStorage.getItem("list-user")).length - 1
        ].id + 1
      );
      navigate("/");
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
          <div className="input-repeat-password">
            <input
              placeholder="Repeat password"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="form-button">
          <button type="submit" onClick={handleSignUp}>
            Sign up
          </button>
          <p
            className="invalid"
            style={invalid ? { display: "block" } : { display: "none" }}
          >
            Invalid input
          </p>
        </div>
        <div className="form-footer">
          <p>Already a member?&nbsp;</p>
          <Link to={"/sign-in"}>Sign in now</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
