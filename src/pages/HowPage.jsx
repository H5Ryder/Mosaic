import React from "react";
import howImage from "../assets/how-to-image.png";
import { useNavigate } from "react-router-dom";



function HowPage() {
    const navigate = useNavigate();

  return (
    <div className="center-container">
    <div className="how-to-container">
      <img src={howImage} className="how-to-gif"></img>
      <div className="instructions">
        <h2>Guide:</h2>

        <ol className="list" style={{ listStyleType: 'decimal' }}>
        <li>Enter API Token to top search bar (Email: <a href="mailto:harrisryder321@gmail.com">harrisryder321@gmail.com</a> for token)</li>
            <li>Search Album or Artist of interest</li>
            <li>Select albums from search results</li>
            <li>Enter prompt, what you would like to see in the rendered image</li>
            <li>Select image strength, determines how much impact the input image has on the render</li>
            <li>Press Render and wait for result</li>
        </ol>

        <p className="go-to-editor" onClick={() => navigate('/editor')}>Go to Editor</p>

       
      </div>
    </div>
    </div>
  );
}

export default HowPage;
