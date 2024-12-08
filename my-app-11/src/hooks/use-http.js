import { useState } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const sendRequest = async (callBackFn, configObj) => {
    setLoading(true);
    try {
      let response = await fetch(configObj.url, {
        method: configObj.method,
        body: JSON.stringify(configObj.body),
        headers: {
          "Content-Type": "application/json",
        }
      })

      if(!response.ok) {
        throw new Error("Someting went wrong when connecting to server");
      }

      response = await response.json();
      callBackFn(response);

      setError(null);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }


  return [loading, error, sendRequest];
}

export default useHttp;