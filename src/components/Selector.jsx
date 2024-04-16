import React from "react";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import { updateData, retrieveData } from "../context/EditorContext";

export default function Selector() {
  const [searchImgs, setSearchImgs] = useState(null);

  const { searchAlbum } = retrieveData();
  const {addAlbum} = updateData();

  async function submitSearch(searchedArtist) {
    if (searchedArtist != "") {
    const imgs = await searchAlbum(searchedArtist);
    setSearchImgs(imgs);
    }
  }

  function submitAlbum(album) {
    addAlbum(album);
  }

  return (
    <>
      <SearchBar submitSearch={submitSearch} />
      <ImageGallery images={searchImgs} addAlbum= {submitAlbum} />
    </>
  );
}
