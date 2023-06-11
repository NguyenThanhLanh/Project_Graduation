import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivePage = () => {
  const [error, setError] = useState(false);
  const { active_Token } = useParams();

  useEffect(() => {
    if (active_Token) {
      const sendRequest = () => {
        axios
          .post(`${server}/activation`, {
            active_Token,
          })
          .then((res) => {})
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p className="font-bold text-2xl">Your token is expired!</p>
      ) : (
        <p className="font-bold text-2xl">
          Your account has been created suceessfully!
        </p>
      )}
    </div>
  );
};

export default ActivePage;
