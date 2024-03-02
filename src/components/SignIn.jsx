import React, { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Signing.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
  };

  return (
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
      </div>
      <div className="form-footer">
        <p>Not a member?&nbsp;</p>
        <Link to={"/sign-up"}>Sign up now</Link>
      </div>
    </form>
  );
};

export default SignIn;
