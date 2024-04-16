import React, {useState, useEffect} from 'react'


export default function SearchBar({submitSearch}) {
  
    const [search, setSearch] = useState('');
    //<button type="submit" onClick={() => submitSearch(search)}>Submit</button>


    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        submitSearch(search);
      }, 600)
  
      return () => clearTimeout(delayDebounceFn)

    }, [search]);
  

    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter an artist of interest"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
  
      </div>
  
    );



}
