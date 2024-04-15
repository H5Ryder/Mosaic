import React from 'react'

//RETURNS AN ARRAY OF IMAGES INSIDE A CONTAINER
export default function imageGallery({images}) {


    function _imageArray(data) {
      console.log("Data");
      console.log(data);
      console.log("Data");

        return data.map((imgUrl,index) => {
            return <img key={index} src={imgUrl} ></img>
        })
    }


  return (
    <div className="image-gallery">
        {Array.isArray(images) ? _imageArray(images) : ""}
    </div>
  )
}
