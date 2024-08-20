import React, { useState, useEffect } from 'react';

const RatingInput = ({ rating, setRating }) => {
  const [inputValue, setInputValue] = useState(rating || '');

  useEffect(() => {
    setInputValue(rating || '');
  }, [rating]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const floatValue = parseFloat(value);

    if (value === '') {
      setInputValue('');
      setRating('');
    } else if (!isNaN(floatValue) && (floatValue >= 0 && floatValue <= 10) && (floatValue % 0.5 === 0)) {
      setInputValue(value);
      setRating(floatValue);
    }
  };

  return (
    <div className='flex items-center gap-4 mt-3'>
      <input
        type="number"
        min="0"
        max="10"
        step="0.5"
        value={inputValue}
        className='text-sm bg-transparent border px-2 py-2 rounded outline-none w-full md:w-1/2'
        placeholder='Rating (0-10)'
        onChange={handleInputChange}
      />
    </div>
  );
};

export default RatingInput;
