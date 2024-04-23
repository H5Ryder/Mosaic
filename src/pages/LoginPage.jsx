import React, { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [time, setTime] = useState("10m");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = import.meta.env.VITE_SERVER_URL_lOGIN; // Adjust the endpoint as needed

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        time: time,
      }), // Convert your data into a JSON string
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    try {
      const responseData = await response.json(); // Assuming the server responds with JSON
      console.log("the response data", responseData);
      setToken(responseData.token);
    } catch (error) {
      console.error("Failed to fetch or parse response:", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="time">Time:</label>
          <input
            type="text"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <button className="save-token"
        onClick={(e) => {
            navigator.clipboard.writeText(token);
        }}
      >
        {token}
      </button>
    </div>
  );
}

export default LoginPage;
