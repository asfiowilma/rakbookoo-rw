import React from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchBar = () => {
  return (
    <div className="input-group w-full flex-1 md:max-w-md lg:max-w-lg">
      <input
        type="search"
        className="input input-bordered w-full flex-1"
        placeholder="Enter search term"
      />
      <span className="btn">
        <BiSearch className="h-5 w-5" />
      </span>
    </div>
  )
}

export default SearchBar
