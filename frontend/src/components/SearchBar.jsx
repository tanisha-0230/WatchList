import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch, filterFavNotes, handleFilterChange, selectedFilter, isFavoriteFilter }) => {
  const toggleFavFilter = () => {
    const newFilter = !isFavoriteFilter;
    filterFavNotes(newFilter);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='w-full flex flex-col md:flex-row md:items-center gap-2'>
      {/* Search Bar */}
      <div className='w-full md:w-auto flex items-center gap-2 bg-slate-100 rounded-md px-4 py-3'>
        <input 
          type="text"
          placeholder='Search' 
          className='w-full text-xs bg-transparent outline-none'
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyPress}
        />

        {value && (
          <IoMdClose 
            className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3' 
            onClick={onClearSearch}
          />
        )}

        <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-black' onClick={handleSearch} />
      </div>

      {/* Button and Status Filter */}
      <div className='flex justify-center gap-2 mt-2 md:mt-0'>
        <button
          className={`cursor-pointer text-xs rounded-full hover:text-black px-4 py-2 bg-slate-100 ${
            isFavoriteFilter 
              ? 'text-black border-2 border-primary' 
              : 'text-slate-500'
          }`}
          onClick={toggleFavFilter}
        >
          {isFavoriteFilter ? <strong className='font-bold'>✓</strong> : ''} fav
        </button>     

        <select
          value={selectedFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
          className='text-xs text-slate-500 bg-slate-100 rounded-md p-2 outline-none cursor-pointer'
        >
          <option value="All">All</option>
          <option value="Watched">Watched</option>
          <option value="Currently Watching">Currently Watching</option>
          <option value="Unwatched">Unwatched</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
