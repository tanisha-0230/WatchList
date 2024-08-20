import React from 'react';

const StatusInput = ({ status, setStatus }) => {
  const handleChange = (e) => {
    setStatus(e.target.value);
  }

  return (
    <div className='flex flex-col mt-3'>
      <select
        value={status}
        onChange={handleChange}
        className='text-sm text-slate-400 bg-transparent border px-2 py-2 rounded outline-none md:w-1/2'
        required
      >
        <option value="" disabled>Select Status</option>
        <option value="Watched">Watched</option>
        <option value="Currently Watching">Currently Watching</option>
        <option value="Unwatched">Unwatched</option>
      </select>
    </div>
  );
}

export default StatusInput;
