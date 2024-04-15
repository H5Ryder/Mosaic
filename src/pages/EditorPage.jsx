import { useState, useEffect } from "react";
import Form from "../components/Form";
import ImageGallery from "../components/ImageGallery";


function EditorPage() {
  const [albums, setAlbums] = useState("");
  const [token,setToken] = useState(null);


  const _getToken = async () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    const url = "https://accounts.spotify.com/api/token";

    const params = {
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    };
    const encodedParams = new URLSearchParams(params).toString();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encodedParams, // Corrected: Directly use encodedParams without JSON.stringify
    });

    const data = await response.json();
    console.log(data);
    return data.access_token;
  };

  const _searchAlbum = async (artist, token, searchLimit = 10) => {
    const searchUrl = "https://api.spotify.com/v1/search";
    const query = `?q=${artist}&type=album&limit=${searchLimit}`;
    const url = searchUrl + query;

    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  };

  function _organiseSearchResults(data) {
    let results = data.albums.items.map((item) => {
      return item.images[1].url;
    });

    console.log("ALBUMS");
    console.log(results);
    setAlbums(results);
  }

  function submitSearch(search) {
    
    console.log(search);
    _getToken().then((token) => {
      _searchAlbum(search, token).then((data) => {
        console.log(data);
        _organiseSearchResults(data);
      });
    });
  }

  return (
    <>
      <Form submitSearch={submitSearch}/>
      <ImageGallery images={albums} />

    </>
  );
}

export default EditorPage;
