import React from "react";
import { useImageSize } from "react-image-size";
import "./Search.css";

const SearchItem = ({ props }) => {
  const [dimensions, { loading, error }] = useImageSize(
    `https://t.vndb.org/cv/${props.image.id.slice(-2)}/${props.image.id.slice(
      2
    )}.jpg`
  );
  let imgStyle =
    dimensions === null
      ? ""
      : dimensions?.height >= (dimensions?.width * 350) / 375
      ? "tall-img"
      : "wide-img";
  let bgStyle =
    dimensions === null
      ? ""
      : dimensions?.height >= (dimensions?.width * 350) / 375
      ? "tall-bg"
      : "wide-bg";

  return (
    <div className="search-component">
      <div
        className={`img-wrap ${bgStyle}`}
        style={{
          backgroundImage: `url('https://t.vndb.org/cv/${props.image.id.slice(
            -2
          )}/${props.image.id.slice(2)}.jpg')`,
        }}
      >
        <img
          className={imgStyle}
          src={`https://t.vndb.org/cv/${props.image.id.slice(
            -2
          )}/${props.image.id.slice(2)}.jpg`}
          draggable={"false"}
        />
      </div>
    </div>
  );
};

export default SearchItem;
