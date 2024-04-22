import React, {useEffect} from 'react'
import PromptBar from './PromptBar'
import WeightMixer from './WeightMixer'
import HistoryViewer from './HistoryViewer'
import { updateData, retrieveData } from "../context/EditorContext";


export default function ControlPanel() {

  const {render} = updateData();
  const {apiLoading} = retrieveData();

  
  useEffect(() => {
    const submitRenderButton = document.querySelector('.submit-render-button');
    if (!submitRenderButton) return; // Guard clause in case the button is not rendered yet
    let dotCount = 0;

    if (!apiLoading) {
      submitRenderButton.textContent = 'Render'; // Reset button text
    } else {
      const intervalId = setInterval(() => {
        submitRenderButton.textContent = `Rendering${'.'.repeat(dotCount % 4)}`; // Adjusted for including 'Rendering' with no dots
        dotCount++;
      }, 400);

      // Clear the interval when the component unmounts or apiLoading changes
      return () => clearInterval(intervalId);
    }

  }, [apiLoading]);







  return (
    <div className="control-panel">
      <WeightMixer/>
      <PromptBar/>
      <HistoryViewer/>
      <button className={`submit-render-button ${apiLoading ? `active` : ``}`} onClick={render}>Render</button>
    </div>
  )
}
