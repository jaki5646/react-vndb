import React from "react";

const DetailImg = ({ props }) => {
    !!props && console.log(`https://t.vndb.org/${props.id.split("").reverse().join("").slice(-2).split("").reverse().join("")}/${props.id.slice(-2)}/${props.id.slice(2)}.jpg`)
  return <img src={`https://t.vndb.org/${props.id.split("").reverse().join("").slice(-2).split("").reverse().join("")}/${props.id.slice(-2)}/${props.id.slice(2)}.jpg`} alt="" />
};

export default DetailImg;
