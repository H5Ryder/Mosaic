import React from "react";
import { useState, useEffect } from 'react'; 


export default function Form({submitSearch}) {

  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState(null);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <p>// place for errors</p>
      <button type="submit" onClick={() => submitSearch(search)}>Submit</button>

    </div>

  );
}
