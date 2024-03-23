import React, { useEffect, useState } from "react";
import { kana } from "./Home";
import { useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import "./Detail.css";
import DetailImg from "./DetailImg";
import Slider from "react-slick";
import useWindowDimensions from "./useWindowDimensions";

const Detail = () => {
  const { height, width } = useWindowDimensions();
  const params = useParams();
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [screenshot, setScreenshot] = useState();

  useEffect(() => {
    setLoading(true);
    kana.apis
      .getVn({
        filters: ["id", "=", params.id],
        fields: [
          "id",
          "title",
          "image.id",
          "released",
          "platforms",
          "languages",
          "image.violence",
          "image.sexual",
          "screenshots.id",
          "screenshots.sexual",
          "description",
          "length_minutes",
          "length_votes",
          "aliases",
          "developers.name",
        ],
      })
      .then((res) => {
        // filter nsfw contents
        setResult(res.results[0]);
        setLoading(false);
        console.log(res.results[0])
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  let screenshots = [];
  let hours = 0;
  let minutes = 0;
  let aliases = [];
  let developers = [];
  if (result !== undefined) {
    aliases = result.aliases.filter((e, i) => i < result.aliases.length - 1);
    developers = result.developers.filter(
      (e, i) => i < result.developers.length - 1
    );
    hours = Math.floor(result.length_minutes / 60);
    minutes = result.length_minutes % 60;
    screenshots = result.screenshots.filter((i) => i.sexual === 0);
  }

  const handleImage = (e) => {
    setScreenshot(e.target.src);
  };

  let settings = {
    infinite: true,
    slidesToShow: width <= 992 ? 3 : 4,
    slidesToScroll: 4,
    autoplay: false,
    speed: 1000,
  };

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

  return loading ? (
    <div className="loading-wrap">
      <PuffLoader color="#e57cb9" className="loading-icon" />
    </div>
  ) : !loading && result !== undefined ? (
    <div className="detail" style={{padding: width <= 992 && '0 20px'}}>
      <div className="detail-top" style={{flexDirection: width <= 992 && 'column'}}>
        <div className="detail-left">
          <img
            className="detail-img"
            src={`https://t.vndb.org/cv/${result.image.id.slice(
              -2
            )}/${result.image.id.slice(2)}.jpg`}
            alt="Something went wrong"
          />
        </div>
        <div className="detail-right">
          <h2 className="detail-title">{result.title}</h2>
          <p className="aliases">
            Aliases:{" "}
            {result.aliases.length < 0
              ? "None"
              : result.aliases.length > 2
              ? aliases.map((i) => `${i}, `) +
                result.aliases[result.aliases.length - 1]
              : result.aliases[result.aliases.length - 1]}
          </p>
          <p className="play-time">
            Playtime:{" "}
            {hours === 0 ? (
              "No data"
            ) : hours < 10 ? (
              <>
                <span>Short</span>
                <span>({hours}h</span>
                {minutes !== 0 && <span>{minutes}m</span>}
                <span> from {result.length_votes} votes)</span>
              </>
            ) : hours < 30 ? (
              <>
                <span>Medium </span>
                <span>({hours}h</span>
                <span>{minutes !== 0 && `${minutes}m`}</span>
                <span> from {result.length_votes} votes)</span>
              </>
            ) : hours < 50 ? (
              <>
                <span>Long </span>
                <span>({hours}h</span>
                <span>{minutes !== 0 && `${minutes}m`}</span>
                <span> from {result.length_votes} votes)</span>
              </>
            ) : (
              <>
                <span>Very long </span>
                <span>({hours}h</span>
                <span>{minutes !== 0 && `${minutes}m`}</span>
                <span> from {result.length_votes} votes)</span>
              </>
            )}
          </p>
          <p className="developer">
            Developer:{" "}
            {developers.length > 0 &&
              developers.map((e, i) => (
                <span key={i}>
                  <span className="developer-name">{e.name}</span>
                  <span> & </span>
                </span>
              ))}
            <span className="developer-name">
              {result.developers[result.developers.length - 1].name}
            </span>
          </p>
          <p className="released">Released in {result.released}</p>
          <div className="description"><p style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: convertTagsToHtml(`Description:\n\n${result.description}`) }}></p></div>
        </div>
      </div>
      <div className="detail-bottom" style={{display: result.screenshots.length > 0 ? 'block' : 'none'}}>
        <div className="bottom-big-image">
          <img
            src={
              screenshot === undefined && result.screenshots.length > 0
                ? `https://t.vndb.org/${screenshots[0].id
                    .split("")
                    .reverse()
                    .join("")
                    .slice(-2)
                    .split("")
                    .reverse()
                    .join("")}/${screenshots[0].id.slice(
                    -2
                  )}/${screenshots[0].id.slice(2)}.jpg`
                : screenshot
            }
            alt=""
          />
        </div>
        <Slider {...settings} className="slide-imgs">
          {screenshots.map((e, i) => (
            <img
              key={i}
              onClick={handleImage}
              className="slide-img"
              src={`https://t.vndb.org/${e.id
                .split("")
                .reverse()
                .join("")
                .slice(-2)
                .split("")
                .reverse()
                .join("")}/${e.id.slice(-2)}/${e.id.slice(2)}.jpg`}
            ></img>
          ))}
        </Slider>
      </div>
    </div>
  ) : (
    <div className="no-result-wrap">
      <p>Failed to fetch details</p>
    </div>
  );
};

export default Detail;
