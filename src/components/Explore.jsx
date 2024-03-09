import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Explore = ({ props, onClick }) => {
  // props && console.log(props)

  return !props ? (
    <div>Unreachable</div>
  ) : (
    <Link to={`/vn/${props.id}`}>
      <div
        className="explore-component"
        onClick={() => {
          onClick(props);
        }}
      >
        <img
          src={`https://t.vndb.org/cv/${props.image.id.slice(
            -2
          )}/${props.image.id.slice(2)}.jpg`}
          draggable={"false"}
        ></img>
        <h3>{props.title}</h3>
      </div>
    </Link>
  );
};

export default Explore;
