import React from 'react'

const EmptyCard = ({ imgSrc, message, onClick }) => {
  return (
    <div className='flex flex-col items-center justify-center mt-20' onClick={onClick}>
      <img src={imgSrc} alt='No notes' className='w-60 rounded-3xl' />

      <p className='w-1/2 text-xl font-medium text-slate-700 text-center leading-7 mt-5'>
        {message}
      </p>
    </div>
  )
}

export default EmptyCard
