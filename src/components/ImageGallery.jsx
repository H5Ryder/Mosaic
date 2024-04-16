import React from 'react'

//RETURNS AN ARRAY OF IMAGES INSIDE A CONTAINER
export default function imageGallery({images, addAlbum}) {


    function _imageArray(data) {
        return data.map((img,index) => {
            return <img id={img.id} key={img.id} src={img.url} onClick={() => addAlbum(img)} ></img>
        })
    }


  return (
    <div className="image-gallery">
        {Array.isArray(images) ? _imageArray(images) : ""}
    </div>
  )
}
