import React from "react";
import "./Home.css";

const Explore = ({ props }) => {
  props && console.log(props)

  return !props ? (
    <p>Unreachable</p>
  ) : (
    props.map((i) => (
      <div className="explore-component" key={i.id}>
        <img
          src={`https://t.vndb.org/cv/${i.image.id.slice(
            -2
          )}/${i.image.id.slice(2)}.jpg`}
        ></img>
      </div>
    ))
  );
};

export default Explore;
