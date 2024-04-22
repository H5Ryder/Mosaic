import React from 'react';
import { updateData, retrieveData } from "../context/EditorContext";


function HistoryViewer() {

  const {renderHistory} = retrieveData();
  const {updateRenderImage} = updateData();


  async function downloadRender(imageUrl) {
    const image = await fetch(imageUrl)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'image file name here'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

  }



  function displayPrevRenders(arrayOfImages) {
    return arrayOfImages.map((image,index) => (
      <>
      <div key={index} className="render-card"> 
        <img className="render-image" src={image} alt={""} /> 
        <div className="render-buttons">
          <button onClick={() => downloadRender(image)}>Save</button>
          <button onClick={() => updateRenderImage(image)}>View</button>
        </div>
      </div>
</>
      
    ));
  }

  return (
    <div className='history-viewer'>
      { Array.isArray(renderHistory) ? displayPrevRenders(renderHistory): ""}
    </div>
  )
}

export default HistoryViewer
