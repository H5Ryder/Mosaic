import React, { useState, useEffect, useContext, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const DataRetrieveContext = createContext();
export const DataUpdateContext = createContext();

export function updateData() {
  return useContext(DataUpdateContext);
}

export function retrieveData() {
  return useContext(DataRetrieveContext);
}

export default function EditorProvider({ children }) {
  const [albumImages, setAlbumImages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [token, setToken] = useState(null);
  const [viewRender, setViewRender] = useState(false);
  const [renderImage, setRenderImage] = useState(null);
  const [renderHistory, setRenderHistory] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const toggleImageView = (boolVal) => {
    setViewRender(boolVal);
  }

  const updateSliderValues = (newSliderValues) => {
    setAlbumImages(newSliderValues);
  };

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
    setToken(data.access_token);
  };

  const searchAlbum = async (artist, searchLimit = 25) => {
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

    //Extracts image component from Data
    let dataImages = data.albums.items.map((item) => {
      return { url: item.images[1].url, id: crypto.randomUUID() };
    });

    return dataImages;
  };

  const addAlbum = (newEntry) => {
    if (
      albumImages.length < 4 &&
      !albumImages.some((album) => album.id === newEntry.id)
    ) {
      setAlbumImages([...albumImages, newEntry]);
    }
  };

  const removeAlbum = (existingEntryId) => {
    setAlbumImages(albumImages.filter((album) => album.id !== existingEntryId));
  };

  const render = async () => {

    if (viewRender) {
    return;
    }

    setApiLoading(true);
    console.log("Token val", localStorage.getItem("token"))
    const BASE_URL = "https://"
    const url = `${BASE_URL}${import.meta.env.VITE_SERVER_URL_RENDER}`; // Adjust the endpoint as needed
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({images: albumImages, prompt: prompt}), // Convert your data into a JSON string
    });

    if (!response.ok) {
      setApiLoading(false);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    try {
      const responseData = await response.json(); // Assuming the server responds with JSON
      console.log("the response data",responseData.imgUrl);
      setRenderImage(responseData.imgUrl);
      setRenderHistory([...renderHistory, responseData.imgUrl]);
      setViewRender(true);
      setApiLoading(false);
    } catch (error) {
      console.error("Failed to fetch or parse response:", error);
      setApiLoading(false);

    }

  };

  const updatePrompt = (value) => {
    setPrompt(value);
  }

  const updateRenderImage = (imageUrl) => {
    setRenderImage(imageUrl)
    setViewRender(true)
  }



  useEffect(() => {
    _getToken();
  }, []);

  return (
    <DataRetrieveContext.Provider value={{ searchAlbum, albumImages, prompt, viewRender, renderImage, apiLoading, renderHistory}}>
      <DataUpdateContext.Provider
        value={{ addAlbum, removeAlbum, render, updateSliderValues, updatePrompt, toggleImageView,updateRenderImage }}
      >
        {children}
      </DataUpdateContext.Provider>
    </DataRetrieveContext.Provider>
  );
}
