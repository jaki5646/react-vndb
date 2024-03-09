import React, { useEffect, useState } from "react";
import { kana } from "./Home";
import { useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";

const Detail = () => {
  const params = useParams();
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

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
          "devstatus",
          "image.violence",
          "image.sexual",
          "screenshots.id",
          "screenshots.sexual",
          "tags.category",
        ],
      })
      .then((res) => {
        // filter nsfw contents
        setResult(res.results[0]);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);



  
  return loading ? (
    <SyncLoader color="#36d7b7" />
  ) : !loading && result !== undefined ? (
    <p>Hello world</p>
  ) : (
    <p>lmao</p>
  );
};

export default Detail;
