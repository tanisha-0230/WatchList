import React from 'react'
import { getInitials } from '../utils/helper'

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
    <div className='flex items-center gap-3'>
        <div className='w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
            {getInitials(userInfo.fullName)}
        </div>

        <div className='flex flex-col'>
            <p className='text-[0.8rem] sm:text-sm font-medium'>{userInfo.fullName}</p>
            <button className='text-[0.8rem] sm:text-sm text-slate-700 underline' onClick={onLogout}>
                Logout
            </button>
        </div>
      
    </div>
    )
  )
}

export default ProfileInfo
