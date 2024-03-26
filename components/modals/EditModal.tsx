import React from 'react';

import Image from 'next/image';
import { FaUpload } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

import defaultImage
  from '@/assets/ab67706c0000da8463bcdace67f79859e30a17fa.jpeg';
import { userData } from '@/pages/profile';

import Modal from './Modal';

type Props = {
    isOpen: boolean, onClose: () => void, userData: userData, changePhoto: (event: any) => void,
changeUsername:(e:any)=>void, submitForm:() => Promise<void>
};

function EditModal({isOpen, onClose, userData, changePhoto, changeUsername, submitForm}: Props) {
    const {username, profileImg}=userData;
  return (
      <Modal body={<div className={`w-screen ${isOpen ? '' : 'hidden'} flex flex-col justify-center items-center h-screen fixed z-[100] top-0 left-0 bg-spotifyOpacityDarkGray`}>
          <div className="  bg-spotifyDarkGray sm:w-full lg:w-1/2 xl:max-w-lg w-full max-w-xl flex flex-col gap-4 rounded-lg p-4">
              <div className="flex justify-between p-2">
                  <p className="text-xl font-bold">Profile Details</p>
                  <button onClick={onClose}><IoClose size={24} className=' text-spotifyLightGray'/></button>
              </div>
              <div className="flex p-4 gap-6 items-center justify-between">
                  <div className="w-48 h-48 relative top-0 left-0 group overflow-hidden">
                      <button>     
                      <Image width={192} height={192}  className='w-48 h-48 rounded-full object-cover' alt='' src={profileImg ? profileImg : defaultImage} />
                      </button>
                      <div className="w-full cursor-pointer group flex flex-col gap-1 justify-center items-center h-full group-hover:top-0 group-hover:left-0 rounded-full duration-500 absolute transition-all top-full -left-full bg-spotifyOpacityDarkGray">
                          <FaUpload size={32} />
                          <input onChange={changePhoto} type="file" className=" opacity-0" name="" id="" />
                          <p>Upload a photo</p>
                      </div>
                  </div>

                  <div className="flex flex-col gap-4">
                      <input onChange={changeUsername} type="text" className=' bg-spotifyMediumGray focus:border-none outline-none rounded-lg p-2 font-inherit border-none' value={username}/>
                      <button onClick={submitForm} className='rounded-full bg-white text-spotifyBlack px-2 py-3 w-24 font-medium self-end'>Save</button>
                </div>
</div>

          </div>

      </div> } />
  )
}

export default EditModal