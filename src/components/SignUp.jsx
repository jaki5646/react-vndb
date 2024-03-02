import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import './Signing.css'

const SignUp = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSignUp = (e) => {
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
          Sign up
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
      </div>
      <div className="form-footer">
        <p>Already a member?&nbsp;</p>
        <Link to={"/sign-in"}>Sign in now</Link>
      </div>
    </form>
  )
}

export default SignUp