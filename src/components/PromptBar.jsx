import React from 'react'
import { updateData, retrieveData } from "../context/EditorContext";


export default function PromptBar() {
  const { prompt } = retrieveData();
  const {updatePrompt} = updateData();

  function setPrompt(e) {
    updatePrompt(e.target.value);
  }

  return (
    <textarea className='prompt-bar' placeholder='Enter your prompt here...' value={prompt} onChange={setPrompt}></textarea>
  )
}
