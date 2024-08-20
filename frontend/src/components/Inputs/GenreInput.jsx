import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const GenreInput = ({ genres, setGenres }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const addNewGenre = () => {
    if (inputValue.trim() !== "" && genres.length < 3) {
      setGenres([...genres, inputValue.trim()]);
      setInputValue("");
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewGenre();
    }
  }

  const handleRemoveGenre = (genreToRemove) => {
    setGenres(genres.filter((genre) => genre !== genreToRemove));
  }

  return (
    <div>
      {genres.length > 0 && (
        <div className='flex items-center gap-2 flex-wrap mt-2'>
          {genres.map((genre, index) => (
            <span key={index} className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'>
              {genre}
              <button onClick={() => handleRemoveGenre(genre)}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className='flex items-center gap-4 mt-3'>
        <input
          type="text"
          value={inputValue}
          className='text-sm bg-transparent border px-2 py-2 rounded outline-none w-1/2'
          placeholder='Add Genres'
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={genres.length >= 3}
        />
        <button
          className={`w-8 h-8 flex items-center justify-center rounded border ${genres.length >= 3 ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-blue-700 hover:bg-blue-700'}`}
          onClick={addNewGenre}
          disabled={genres.length >= 3}
        >
          <MdAdd className={`text-2xl ${genres.length >= 3 ? 'text-gray-300' : 'text-blue-700 hover:text-white'}`} />
        </button>
      </div>
    </div>
  )
}

export default GenreInput
