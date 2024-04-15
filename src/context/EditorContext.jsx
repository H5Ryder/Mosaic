import React, { useState, useEffect, useContext, createContext } from "react";

export const DataRetrieveContext = createContext();
export const DataUpdateContext = createContext();

export function updateData() {
  return useContext(DataUpdateContext);
}

export function retrieveData() {
  return useContext(DataRetrieveContext);
}

export default function EditorProvider({ children }) {
  const [albumImages, setAlbumImages] = useState("");
  const [token, setToken] = useState(null);

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

  const searchAlbum = async (artist,searchLimit = 10) => {
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
        return item.images[1].url;
      });
      
    console.log("search Albums")
    console.log(dataImages);
    return dataImages
  };

  useEffect(() => {
    _getToken();
  },[])

  return (
    <DataRetrieveContext.Provider value={{searchAlbum, albumImages}}>
      <DataUpdateContext.Provider>
        {children}
      </DataUpdateContext.Provider>
    </DataRetrieveContext.Provider>
  );
}
