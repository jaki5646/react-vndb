import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound">
      <h1>404</h1>
        <div className="notfound-second">
          <h3>Thewe is nothing hewe</h3>
          <img src="/img/notfound.png" alt="asfafa" />
        </div>
        <h3>Back to <Link to={'/'}>home</Link></h3>
    </div>
  );
};

export default NotFound;
