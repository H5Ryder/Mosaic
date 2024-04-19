import React from 'react'

//RETURNS AN ARRAY OF IMAGES INSIDE A CONTAINER
export default function imageGallery({images, addAlbum}) {


    function _imageArray(data) {
        return data.map((img,index) => {
         
          const album = { ...img, weight: 50 };
            return <img id={img.id} key={img.id} src={img.url} onClick={() => addAlbum(album)} ></img>
        })
    }


  return (
    <div className="image-gallery">
        {Array.isArray(images) ? _imageArray(images) : ""}
    </div>
  )
}
