import React from 'react'

//RETURNS AN ARRAY OF IMAGES INSIDE A CONTAINER
export default function imageGallery({images}) {


    function _imageArray(data) {
        return data.map((imgUrl,index) => {
            return <img key={index} src={imgUrl} ></img>
        })
    }



  return (
    <div>
        {images ?  _imageArray(images) : ""}
    </div>
  )
}
