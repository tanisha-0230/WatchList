import React from 'react'
import { MdFavorite } from 'react-icons/md'
import { MdCreate, MdDelete } from 'react-icons/md'
import moment from 'moment'

const NoteCard = ({title, date, genre, tag, isFavorite, rating, status, onEdit, onDelete, onFavorite}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Watched':
        return 'bg-green-700';
      case 'Unwatched':
        return 'bg-red-700';
      case 'Currently Watching':
        return 'bg-blue-700';
      default:
        return 'bg-slate-400';
    }
  }

  return (
    <div className='w-[300px] lg:w-[350px] flex flex-col justify-between h-full border rounded p-4 bg-white lg:transition-all lg:ease-in-out lg:hover:shadow-xl'>
      <div className='flex items-center justify-between'>
        <div>
            <h6 className='text-base font-medium'>{title}</h6>
        </div>
        <MdFavorite 
          className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-slate-300'} rounded-full p-[0.05rem] cursor-pointer lg:hover:border-2 lg:hover:border-red-500`} 
          onClick={onFavorite}
        />      
        </div>
      <span className='text-xs text-slate-500'>{moment(date).format('Do MMM YYYY')}</span>


      {/* Rating */}
      <div className='flex items-center mt-1'>
        <span className='text-sm text-slate-500'>Rating: {rating || 'NA'}</span>
      </div>

      {/* Genre */}
      <div className='flex items-center mt-1'>
        <span className='text-sm text-slate-500 me-1'>Genre:</span>
        <div className="flex flex-wrap gap-2 text-xs mt-1">
          {genre.map((g, index) => (
            <div key={index} className="px-2 py-1 rounded-full bg-slate-400 text-white">
              {g}
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      {Array.isArray(tag) && tag.length > 0 && (
        <div className="flex flex-wrap gap-1 items-center mt-1 text-xs text-slate-600">
          {tag.map((t, index) => (
            <span key={index}>#{t}</span>
          ))}
        </div>
      )}  

      {/* Status */}
      <div className='flex items-center justify-between mt-1'>
        <div className={`text-sm ${getStatusColor(status)} px-2 py-1 rounded text-white`}>
          {status}
        </div>
        <div className='flex items-center gap-2'>
            <MdCreate
                className='icon-btn hover:text-primary' 
                onClick={onEdit}
            />
            <MdDelete
                className='icon-btn hover:text-green-600' 
                onClick={onDelete}
            />
        </div>
      </div>
    </div>
  )
}

export default NoteCard