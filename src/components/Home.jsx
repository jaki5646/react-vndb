import React, { useEffect, useState } from "react";
import Kana from "vndb-api-kana";
import Explore from "./Explore";
import "./Home.css";
import Slider from "react-slick";
import Producer from "./Producer";
import useWindowDimensions from "./useWindowDimensions";

export const kana = new Kana({
  baseURL: "https://api.vndb.org/kana",
});

const Home = () => {
  const { height, width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [recommend, setRecommend] = useState([]);
  const [romance, setRomance] = useState([]);
  const [drama, setDrama] = useState([]);
  const [fantasy, setFantasy] = useState([]);
  const [scifi, setScifi] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [action, setAction] = useState([]);
  const [dev, setDev] = useState([]);

  useEffect(() => {
    setLoading(true);
    // recommend
    kana.apis
      .getVn({
        filters: ["and", ["rating", "<", "100"], ["rating", ">", "87"]],
        results: 20,
        fields: [
          "id",
          "title",
          "image.id",
          "released",
          "platforms",
          "languages",
          "devstatus",
          "image.violence",
          "image.sexual",
          "screenshots.id",
          "screenshots.sexual",
          "tags.category",
          "developers.id",
          "length_minutes",
        ],
      })
      .then((res) => {
        // filter nsfw contents
        let arr = res.results.filter((i) => i.image.sexual === 0);
        setRecommend(arr.slice(arr.length - 9));
      })
      .catch((e) => {
        console.log(e);
      });

    // developers
    kana.apis
      .getProducer({
        filters: [
          "or",
          ["id", "=", "p24"],
          ["id", "=", "p7496"],
          ["id", "=", "p336"],
          ["id", "=", "p6"],
          ["id", "=", "p259"],
          ["id", "=", "p10"],
        ],
        fields: ["name", "id", "type", "description"],
      })
      .then((res) => [setDev(res.results)])
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // romance
  let arrRomance = getNovel("tag", "=", "g64").result;
  useEffect(() => {
    setRomance(arrRomance);
  }, [arrRomance]);

  // drama
  let arrDrama = getNovel("tag", "=", "g147").result;
  useEffect(() => {
    setDrama(arrDrama);
  }, [arrDrama]);

  // fantasy
  let arrFantasy = getNovel("tag", "=", "g2").result;
  useEffect(() => {
    setFantasy(arrFantasy);
  }, [arrFantasy]);

  //scifi
  let arrScifi = getNovel("tag", "=", "g105").result;
  useEffect(() => {
    setScifi(arrScifi);
  }, [arrScifi]);

  // comedy
  let arrComedy = getNovel("tag", "=", "g104").result;
  useEffect(() => {
    setComedy(arrComedy);
  }, [arrComedy]);

  // horror
  let arrHorror = getNovel("tag", "=", "g7").result;
  useEffect(() => {
    setHorror(arrHorror);
  }, [arrHorror]);

  // action
  let arrAction = getNovel("tag", "=", "g12").result;
  useEffect(() => {
    setAction(arrAction);
  }, [arrAction]);

  let settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  let settingsComponent = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
  };
  if(width >= 1300) {
    settings.slidesToShow = 4;
    settingsComponent.slidesToScroll = 3
  }
  else if(width >= 992) {
    settings.slidesToShow = 3
    settingsComponent.slidesToShow = 2
  }
  else if(width >= 762) {
    settings.slidesToShow = 2
    settingsComponent.slidesToShow = 1
  }
  else if(width < 762) {
    settings.slidesToShow = 1
    settingsComponent.slidesToShow = 1
  }

  return (
    <>
      <div className="home-page">
        <h1 className="explore-title">Recommended Visual Novels by fanbase</h1>

        <div className="explore" style={{padding: width > 500 ? "0 115px" : width>= 400 ? "0 90px" : width >= 300 ? "0 50px" : "0"}}>
          <Slider {...settings} className="slider">
            {recommend.map((i) => {
              return <Explore key={i.id} props={i} />;
            })}
          </Slider>
        </div>
        <div className="home-page-child">
          <div className="tag-vn">
            <div className="tag-romance">
              <div className="tag-title">
                <h1>Romance</h1>
                <hr />
              </div>
              <Slider {...settingsComponent} className="slider slider-child">
                {romance.map((i) => {
                  return (
                    <Explore key={i.id} props={i} />
                  );
                })}
              </Slider>
            </div>
            <div className="tag-drama">
              <div className="tag-title">
                <h1>Drama</h1>
                <hr />
              </div>
              <Slider {...settingsComponent} className="slider slider-child">
                {drama.map((i) => {
                  return (
                    <Explore key={i.id} props={i} />
                  );
                })}
              </Slider>
            </div>
            <div className="tag-fantasy">
              <div className="tag-title">
                <h1>Fantasy</h1>
                <hr />
              </div>
              <Slider {...settingsComponent} className="slider slider-child">
                {fantasy.map((i) => {
                  return (
                    <Explore key={i.id} props={i} />
                  );
                })}
              </Slider>
            </div>
            <div className="tag-scifi">
              <div className="tag-title">
                <h1>Scifi</h1>
                <hr />
              </div>
              <Slider {...settingsComponent} className="slider slider-child">
                {scifi.map((i) => {
                  return (
                    <Explore key={i.id} props={i} />
                  );
                })}
              </Slider>
            </div>
            <div className="tag-comedy">
              <div className="tag-title">
                <h1>Comedy</h1>
                <hr />
              </div>
              <Slider {...settingsComponent} className="slider slider-child">
                {comedy.map((i) => {
                  return (
                    <Explore key={i.id} props={i} />
                  );
                })}
              </Slider>
            </div>
            <div className="tag-horror">
              <div className="tag-title">
                <h1>Horror</h1>
                <hr />
              </div>
              <Slider {...settingsComponent} className="slider slider-child">
                {horror.map((i) => {
                  return (
                    <Explore key={i.id} props={i} />
                  );
                })}
              </Slider>
            </div>
            <div className="tag-action">
              <div className="tag-title">
                <h1>Action</h1>
                <hr />
              </div>
              <Slider {...settingsComponent} className="slider slider-child">
                {action.map((i) => {
                  return (
                    <Explore key={i.id} props={i} />
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="favorited-brands" style={{display: width <= 700 && "none"}}>
            <div style={{position: "sticky", top: "10px"}}>
              <h3>Popular brands</h3>
              {dev.map((i) => {
                return (
                  <Producer
                    key={i.id}
                    props={i}
                    className="producer"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

const getNovel = (argument, operator, index) => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    kana.apis
      .getVn({
        filters: [argument, operator, index],
        results: 20,
        fields: [
          "id",
          "title",
          "image.id",
          "released",
          "platforms",
          "languages",
          "devstatus",
          "image.violence",
          "image.sexual",
          "screenshots.id",
          "screenshots.sexual",
          "tags.category",
          "developers.id",
        ],
      })
      .then((res) => {
        // filter nsfw contents
        let arr = res.results.filter((i) => i.image.sexual === 0);
        setResult(arr.slice(arr.length - 9));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return { result };
};
