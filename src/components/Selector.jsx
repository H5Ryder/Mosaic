import React from "react";
import { useState, useEffect } from 'react'; 
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import {updateData, retrieveData} from '../context/EditorContext'



export default function Selector() {
  const [searchImgs, setSearchImgs] = useState(null);

  const {searchAlbum} = retrieveData();
  
  async function submitSearch() {
    const imgs = await searchAlbum();
    setSearchImgs(imgs);
  }

  return (
    <div className="selector">
        <SearchBar submitSearch={submitSearch}/>
        <ImageGallery images={searchImgs}/>
    </div>

  );
}
