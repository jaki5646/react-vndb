import React from "react";
import { Link } from "react-router-dom";

const Producer = ({ props, onClick }) => {
  
  return !props ? (
    <p>Failed to load</p>
  ) : (
    <Link to={`/producer/search?key=${props.name}`}>
      <div className="producer-component">
        <img
          src={`./img/${props.name
            .toLowerCase()
            .split(/[.\-=/_\s]/)
            .join("")}.png`}
          alt="Failed to load image"
          className="producer-image"
        />
      </div>
    </Link>
  );
};

export default Producer;
