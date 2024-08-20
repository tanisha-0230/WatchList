import React, { useState } from 'react';
import ProfileInfo from './ProfileInfo';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import logo from '../assets/w-logo.png';

const Header = ({ userInfo, onSearchNote, handleClearSearch, onFilterChange, onFavoriteFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFavoriteFilter, setIsFavoriteFilter] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const handleFilterChange = (filter) => {
    setStatusFilter(filter);
    onFilterChange(filter);
  };

  const handleFavoriteFilterChange = (isFavFilter) => {
    setIsFavoriteFilter(isFavFilter);
    onFavoriteFilterChange(isFavFilter);
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signUp";

  return (
    <div className='bg-white drop-shadow sticky top-0'>
      <div className='flex items-center justify-between px-5 py-2 border-b-2 md:border-none'>
        <h2 className='text-xl font-medium text-black p-2 flex'>
          <img src={logo} alt="logo" className='w-6 me-2' />
          WatchList
        </h2>
        
        {/* Hidden on smaller screens */}
        {!isAuthPage && (
          <div className='hidden md:block mx-2'>
            <SearchBar 
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
              filterFavNotes={handleFavoriteFilterChange}
              handleFilterChange={handleFilterChange}
              selectedFilter={statusFilter}
              isFavoriteFilter={isFavoriteFilter}
            />
          </div>
        )}

        {!isAuthPage && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
      </div>

      {/* Visible on smaller screens */}
      {!isAuthPage && (
        <div className='block md:hidden p-2 mx-auto drop-shadow'>
          <SearchBar 
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
            filterFavNotes={handleFavoriteFilterChange}
            handleFilterChange={handleFilterChange}
            selectedFilter={statusFilter}
            isFavoriteFilter={isFavoriteFilter}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
