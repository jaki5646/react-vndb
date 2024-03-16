import React from "react";
import { Link } from "react-router-dom";

const Producer = ({ props, onClick }) => {
  
  return !props ? (
    <p>Failed to load</p>
  ) : (
    <Link to={`./public/img/${props.id}`}>
      <div className="producer-component">
        <img
          src={`./public/img/${props.name
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
