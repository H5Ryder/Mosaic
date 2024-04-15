import React, {useState} from 'react'


export default function SearchBar({submitSearch}) {
  
    const [search, setSearch] = useState('');
  
    return (
      <div className="search-bar">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button type="submit" onClick={() => submitSearch(search)}>Submit</button>
  
      </div>
  
    );



}
