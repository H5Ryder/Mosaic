import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate at the top


export default function ButtonBar() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate


  function storeToken(tokenVal) {
    localStorage.setItem("token", tokenVal);
  }

  function removeToken() {
    localStorage.removeItem("token");
  }

  async function checkToken(tokenVal) {
    const BASE_URL = "https://"
    let url = `${BASE_URL}${import.meta.env.VITE_SERVER_URL_CHECK}`;
    try {
      console.log("fetching...", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenVal}`,
        },
      });

      const data = await response.json();

      setVerified(true);
      storeToken(tokenVal);
      setToken(tokenVal)

      console.log("success", data.success);
    } catch (error) {
      console.log("Token auth rejected");
      setVerified(false);
      removeToken();
    }
  }

  useEffect(() => {
    if (token == "" && localStorage.getItem("token") != null) {
      checkToken(localStorage.token);
    } else {
      const delayDebounceFn = setTimeout(() => {
        if (token != "") checkToken(token);
      }, 200);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [token]);

  return (
    <div className="button-bar">
      <div className={`search-bar ${verified ? `verified` : ""}`}>
        <input
          type="text"
          placeholder="Enter Token Harris gave you..."
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />

        <p className={`${verified ? `verified` : ""}`}>Token Valid</p>
      </div>

      

      <h2 onClick={() => navigate('/login')}>Mosaic</h2>
    </div>
  );
}
