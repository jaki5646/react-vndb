import { useEffect, useState } from "react";

const useFetch = (URL) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        fetch(URL)
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              setData(data);
            }
          });
      } catch (e) {
        setError(e);
      }
    })();
  }, [URL]);
  return { data, error };
};

export default useFetch;