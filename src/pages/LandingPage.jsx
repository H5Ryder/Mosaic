import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import strokes from "../assets/strokes.jpg";

function LandingPage() {
  const navigate = useNavigate();
  const [sliderPos, setSliderPos] = useState(50); // Initialize slider position state

  // Function to handle slider change
  const handleSliderChange = (e) => {
    const newPos = e.target.value;
    setSliderPos(newPos); // Update state
  };

  useEffect(() => {}, [sliderPos]);

  return (
    <div className="landing-page">
      <div className="container">
        <div className="img background-img">
          <img className="square-input-image" src="https://i.scdn.co/image/ab67616d00001e025ddbd61ea4a6dab213cc97af" />
          <img className="square-input-image" src="https://i.scdn.co/image/ab67616d00001e022af30c881bb23cfb82a8cf99" />
          <img className="square-input-image" src="https://i.scdn.co/image/ab67616d00001e02e8af44fd3eb1dc7da77fdf00" />
          <img className="square-input-image" src="https://i.scdn.co/image/ab67616d00001e022b6d449e21afb4243aced57b" />
        </div>
        <div
          className="img foreground-img"
          style={{ width: `${sliderPos}%` }}
        ></div>{" "}
        {/* Apply dynamic style */}
        <input
          type="range"
          min="1"
          max="100"
          value={sliderPos}
          className="slider"
          name="slider"
          id="slider"
          onChange={handleSliderChange} // Handle change event
          style={{ "--before-left": `${sliderPos}%` }}
        />
        <div
          className="slider-button"
          style={{ left: `calc(${sliderPos}% - 18px)` }}
        ></div>{" "}
        {/* Apply dynamic style */}

        <p className="title" onClick={() => navigate('/editor')}>Mosaic</p>
        <p className="go-to-editor" onClick={() => navigate('/editor')}>Go to Editor</p>
        <p className="how-to-use" onClick={() => navigate('/how-to')}>How to</p>
      </div>
    </div>
  );
}

export default LandingPage;
