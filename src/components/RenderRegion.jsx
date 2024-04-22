import React from "react";
import DeleteIcon from '../assets/delete.svg';

export default function RenderRegion({ albumImages, removeAlbum, renderImage, viewRender }) {

  function renderAlbumImages() {
    return albumImages.map((img) => (
      <div key={img.id} className="image-container">
        <img src={img.url} alt="" />
        <img src={DeleteIcon} alt="Delete" className="hover-button" onClick={() => removeAlbum(img.id)} />
      </div>
    ));
  }


  return (
    <div className="render-region">
      { viewRender ? (<img className="render-zone" src={renderImage} alt=""></img>) : (<div className="album-grid">{renderAlbumImages()}</div>)}
    </div>
  );
}
