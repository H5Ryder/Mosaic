import React, { useState} from "react";
import ButtonBar from "./ButtonBar";
import RenderRegion from "./RenderRegion";
import PromptBar from "./PromptBar";
import ImageSelection from "./ControlPanel";
import { updateData, retrieveData } from "../context/EditorContext";
import ControlPanel from "./ControlPanel";

export default function Modifier() {
  const { albumImages, renderImage, viewRender} = retrieveData();
  const { removeAlbum, toggleImageView} = updateData();


  return (
    <>
      <ButtonBar />
      <div className="render-container">
        <div className="view-selector">
          <div className={`upload-images ${!viewRender ? 'selected' : ""}`} onClick={() => toggleImageView(false)}>Upload</div>
          <div className={`render-image ${viewRender ? 'selected' : ""}`} onClick={() => toggleImageView(true)}>Render</div>
        </div>
        <RenderRegion albumImages={albumImages} removeAlbum={removeAlbum} renderImage={renderImage} viewRender={viewRender} />
        <PromptBar />
      </div>
      <ControlPanel />
    </>
  );
}
