import React from 'react'
import PromptBar from './PromptBar'
import WeightMixer from './WeightMixer'
import HistoryViewer from './HistoryViewer'
import { updateData, retrieveData } from "../context/EditorContext";


export default function ControlPanel() {

  const {render} = updateData();

  return (
    <div className="control-panel">
      <PromptBar/>
      <WeightMixer/>
      <HistoryViewer/>
      <button className="submit-render-button" onClick={render}>Render</button>
    </div>
  )
}
