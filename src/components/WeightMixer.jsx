import React, { useState, useEffect } from "react";
import { updateData, retrieveData } from "../context/EditorContext";

function WeightMixer() {
  const { updateSliderValues } = updateData();
  const { albumImages, sliderValues } = retrieveData();

  const handleSliderChange = (index) => (event) => {
    const updatedAlbums = albumImages.map((album, idx) =>
      idx === index ? { ...album, weight: event.target.value } : album
    );
    updateSliderValues(updatedAlbums);
  };

  function createSliders() {
    let rangeSliders = albumImages.map((album, index) => {
      const logoPosition =
        index === 0
          ? "top-left"
          : index === 1
          ? "top-right"
          : index === 2
          ? "bottom-left"
          : "bottom-right";

      return (
        <div className="weight-mixer" key={index}>
          <div className="range-bar">
            <div className="grid-key">
              <div className={`grid-section ${logoPosition}`}></div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              className="slider"
              value={album.weight}
              onChange={handleSliderChange(index)}
            />

            <div className="contribution">
              <p>{album.weight}</p>
            </div>
          </div>
        </div>
      );
    });

    return <>{rangeSliders}</>;
  }

  return (
    <div className="weight-mixer">
      {albumImages ? createSliders() : "Harris here"}
    </div>
  );
}

export default WeightMixer;
