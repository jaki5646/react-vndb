import React from "react";
import { useImageSize } from "react-image-size";
import "./Search.css";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const SearchItem = ({ props, onClick }) => {
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
  const convertTagsToHtml = (text) => {
    // Chuyển [b] thành <b> và [/b] thành </b>, chuyển [url] => <a>
    const regex = /\[url=(.*?)\](.*?)\[\/url\]/g;

    return text
      .replace(/\[b\]/g, "<b>")
      .replace(/\[\/b\]/g, "</b>")
      .replace(/\[i\]/g, "<i>")
      .replace(/\[\/i\]/g, "</i>")
      .replace(/\[u\]/g, "<u>")
      .replace(/\[\/u\]/g, "</u>")
      .replace(regex, "<a href='$1'>$2</a>");
  };

  return (
    <Link to={`/vn/${props.id}`}>
      <div className="search-component">
        <div
          className={`img-wrap ${bgStyle}`}
          style={{
            backgroundImage: `url('https://t.vndb.org/cv/${props.image.id.slice(
              -2
            )}/${props.image.id.slice(2)}.jpg')`,
          }}
        >
          <div className={`img-div`}>
            <img
              className={imgStyle}
              src={`https://t.vndb.org/cv/${props.image.id.slice(
                -2
              )}/${props.image.id.slice(2)}.jpg`}
              draggable={"false"}
            />
          </div>
        </div>
        <div className="search-detail">
          <div className="search-detail-status">
            {props.devstatus === 0 ? (
              <p>Finished</p>
            ) : props.devstatus === 1 ? (
              <p>Developing</p>
            ) : (
              <p>Dropped</p>
            )}
          </div>
          <div className="search-detail-title">
            <p>{props.title}</p>
          </div>
          <div className="search-detail-jp-title">
            <p>{props.titles[0].title}</p>
          </div>
          <div className="search-detail-meta">
            <div className="search-detail-release">
              <span className="search-detail-release-icon">
                <FaCalendarAlt />
              </span>
              <span className="search-detail-release-date">
                {props.released}
              </span>
            </div>
          </div>
          <div className="search-detail-description">
            {props?.description === null ? (
              <p>No info available</p>
            ) : (
              <p
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{
                  __html: convertTagsToHtml(
                    `Description:\n\n${props.description}`
                  ),
                }}
              ></p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
