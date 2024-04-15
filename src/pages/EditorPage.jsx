import { useState, useEffect } from "react";
import Selector from "../components/Selector";
import ImageGallery from "../components/ImageGallery";
import Modifier from "../components/Modifier";
import EditorProvider from "../context/EditorContext";

function EditorPage() {


  return (
    <EditorProvider>
      <div className="editor-page">
        <Selector />
        <Modifier />
      </div>
    </EditorProvider>
  );
}

export default EditorPage;
