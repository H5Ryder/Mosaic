import React from "react";
import ButtonBar from "./ButtonBar";
import RenderRegion from "./RenderRegion";
import PromptBar from "./PromptBar";
import ImageSelection from "./ControlPanel";
import { updateData, retrieveData } from "../context/EditorContext";
import ControlPanel from "./ControlPanel";


export default function Modifier() {
  const { albumImages } = retrieveData();
  const {removeAlbum} = updateData();


  return (
    <>
      <ButtonBar />

      <div className="render-container">
        <RenderRegion albumImages={albumImages} removeAlbum={removeAlbum} />
        <PromptBar />
      </div>
      <ControlPanel />
    </>
  );
}
