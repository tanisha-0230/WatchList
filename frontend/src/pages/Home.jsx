import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import NoteCard from '../components/NoteCard'
import EmptyCard from '../components/EmptyCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import Toast from '../components/Toast'
import AddNotesImg from '../assets/add-data.png'
import NoDataImg from '../assets/no-data.png'

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFavoriteFilter, setIsFavoriteFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const [loading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: 'edit'});
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
        console.log("An unexpected error occured. Please try again.");
    } finally {
      if (firstLoad) {
        setLoading(false);
        setFirstLoad(false);
      }    
    }
  };

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", 'delete');
        getFilteredNotes();
      }
    } catch (error) {
      if (
        error.response && 
        error.response.data && 
        error.response.data.message
      ) {
        console.log("An unexpected error occured. Please try again.");
      }
    }
  }

  // Get Notes with Search and Filters
  const getFilteredNotes = async () => {
    try {
      const response = await axiosInstance.get("/search-and-filter-notes", {
        params: {
          query: searchQuery,
          isFav: isFavoriteFilter,
          status: statusFilter
        }
      });
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    } finally {
      if (firstLoad) {
        setLoading(false);
        setFirstLoad(false);
      }    
    }
  };

  // Update Favorites
  const updateIsFavorite = async (noteData) => {
    const noteId = noteData._id
    const favStatus = !noteData.isFavorite
  
    try {
      const response = await axiosInstance.put("/update-note-favorite/" + noteId, {
        "isFavorite": favStatus,
      });

      if (response.data && response.data.note) {
        showToastMessage(
          `Note ${favStatus ? "added to" : "removed from"} favorites`
        );       
        getFilteredNotes();
      }
    } catch (error) {
        console.log(error);  
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('');
    getFilteredNotes();
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter) => {
    console.log('Selected filter:', filter);
    setStatusFilter(filter);
  };

  const handleFavoriteFilterChange = (isFavFilter) => {
    setIsFavoriteFilter(isFavFilter);
  };

  // Update notes when filters or search changes
  useEffect(() => {
    getUserInfo();
    getFilteredNotes(); 
  }, [searchQuery, isFavoriteFilter, statusFilter]);

  // Disable background scroll when modal is open
  useEffect(() => {
    if (openAddEditModal.isShown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [openAddEditModal.isShown]);

  const handleCloseModal = () => {
    setOpenAddEditModal({ isShown: false, type: "add", data: null })
  }

  return (
    <>
      <Header
        userInfo={userInfo} 
        onSearchNote={handleSearchChange}
        onFilterChange={handleFilterChange}
        onFavoriteFilterChange={handleFavoriteFilterChange}
        handleClearSearch={handleClearSearch}
      />

      <div className='container mx-auto mt-5'>
        {loading ? (
          <div className='flex justify-center items-center h-full'>
            <p>Loading...</p>
          </div>
        ) : allNotes.length > 0 ? (
        <div className='flex flex-wrap gap-2 justify-center'>
          {allNotes.map((item) => (
            <div key={item._id} className='flex p-2'>
              <NoteCard
                title={item.title}
                date={item.createdOn}
                genre={item.genres}
                tag={item.tags}
                isFavorite={item.isFavorite}
                rating={item.rating}
                status={item.status}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onFavorite={() => updateIsFavorite(item)}
              />
            </div>
          ))}
        </div>
        ) : (
          <EmptyCard
            imgSrc={
              searchQuery || isFavoriteFilter || statusFilter !== 'All' 
                ? NoDataImg 
                : AddNotesImg
            }
            message={
              searchQuery || isFavoriteFilter || statusFilter !== 'All' 
                ? `Oops! No notes found matching your search or filters.` 
                : `Add your top picks now!`
            }
            onClick={
              searchQuery || isFavoriteFilter || statusFilter !== 'All'
                ? undefined
                : () => setOpenAddEditModal({ isShown: true, type: 'add', data: null })
            }
          />
        )}
      </div>

      <button 
        className='w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed z-50 right-5 bottom-14 md:right-10' 
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }}
      >
        <MdAdd className='text-[32px] text-white' />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Add/Edit Notes"
        className='w-[90%] lg:w-[50%] max-h-[75vh] overflow-auto z-auto bg-white rounded-md mx-auto my-16 p-5'
      >
        <AddEditNotes 
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={handleCloseModal} 
          getAllNotes={getFilteredNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  )
}

export default Home