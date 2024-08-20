import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import GenreInput from '../components/Inputs/GenreInput';
import RatingInput from '../components/Inputs/RatingInput';
import StatusInput from '../components/Inputs/StatusInput';
import axiosInstance from '../utils/axiosInstance';
import TagInput from '../components/Inputs/TagInput';

const AddEditNotes = ({ noteData = {}, type, getAllNotes, onClose, showToastMessage }) => {

  const [title, setTitle] = useState(noteData?.title || "");
  const [genres, setGenres] = useState(noteData?.genres || []);
  const [tags, setTags] = useState(noteData?.tags || []);
  const [rating, setRating] = useState(noteData?.rating || "");
  const [status, setStatus] = useState(noteData?.status || "");
  const [error, setError] = useState(null);

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        genres,
        tags,
        rating,
        status,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  // Edit Note
  const editNote = async () => {
    const noteId = noteData?._id
    const updatedFields = {};

    if (title !== noteData.title) updatedFields.title = title;
    if (genres !== noteData.genres) updatedFields.genres = genres;
    if (tags !== noteData.tags) updatedFields.tags = tags;
    if (rating !== noteData.rating) updatedFields.rating = rating;
    if (status !== noteData.status) updatedFields.status = status;

    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, updatedFields);

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!genres.length) {
      setError("Please add at least one genre");
      return;
    }
    
    if (!status) {
      setError("Please select a status");
      return;
    }

    setError("");

    if (type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  }

  return (
    <div className='relative'>
      <button 
        className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' 
        onClick={onClose}
      >
        <MdClose className='text-xl text-slate-400' />
      </button>

      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input 
          type="text" 
          className='text-2xl text-slate-950 outline-none'
          placeholder='Show Title'
          value={title}
          onChange={({target}) => setTitle(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">Genre (Max 3)</label>
        <GenreInput genres={genres} setGenres={setGenres} />
      </div>

      <div className="mt-3">
        <label className="input-label">Rating</label>
        <RatingInput rating={rating} setRating={setRating} />
      </div>

      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      <div className="mt-3">
        <label className="input-label">Status</label>
        <StatusInput status={status} setStatus={setStatus} />
      </div>

      {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

      <button 
        className='btn-primary font-medium mt-5 p-3'
        onClick={handleAddNote}
      >
        {type === 'edit' ? 'UPDATE' : 'ADD'}
      </button>
    </div>
  )
}

export default AddEditNotes;
