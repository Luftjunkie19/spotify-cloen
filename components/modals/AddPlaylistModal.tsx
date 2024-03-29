import React, { useState } from 'react';

import Modal from './Modal';
import { IoClose } from 'react-icons/io5';
import Select from 'react-tailwindcss-select'
import useSongs from '@/hooks/useSongs';
import useCurrentUser from '@/hooks/useCurrentUser';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';
import { useDispatch, useSelector } from 'react-redux';
import { playlistModalActions } from '@/contexts/PlayListModalContext';
type Props = {}

function AddPlaylistModal({}: Props) {
  const isOpen=useSelector((state:any)=>state.playlistModal.isShown);

  const dispatch=useDispatch();

  const handleClose=()=>{
    dispatch(playlistModalActions.closeModal());
  }

const {data:songs}=useSongs();
const {data:user}=useCurrentUser();

const [selectedSongs, setSelectedSongs] = useState<SelectValue | null>(null);

    const handleChange = (value:SelectValue) => {
        setSelectedSongs(value);
    };



const options= songs && songs.map((song: any)=>{ return {value:song, label:song.title}});

  return (
      <Modal body={<div className={`w-screen ${isOpen ? '' : 'hidden'} flex flex-col justify-center items-center h-screen fixed z-[100] top-0 left-0 bg-spotifyOpacityDarkGray`}>
          <div className="rounded-lg flex flex-col p-6 gap-4 sm:w-full lg:w-3/5 max-w-lg w-full bg-spotifyMediumGray ">
      <div className="flex justify-between">
        <p className=' text-xl font-medium'>Add playlist</p>
      <button onClick={handleClose}>
          <IoClose color="red" size={36}/>
        </button>
        </div>  
      
          <div className="flex flex-col gap-1">
<label htmlFor="">Playlist&apos;s name:</label>
<input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>console.log(e.target.value)} type="text" className='input max-w-sm' />
        </div>


  <div className="flex flex-col gap-1">
<label htmlFor="">Playlist&apos;s image:</label>
<input accept='image/*' type="file" className="file-input file-input-bordered bg-spotifyGreen w-full max-w-xs" />
        </div>

        <div className="flex flex-col gap-1">
<label htmlFor="">Playlist&apos;s songs:</label>
{options && <Select  isMultiple isSearchable placeholder='Select songs' options={options} value={selectedSongs} onChange={handleChange} primaryColor={'indigo'}/>}
        </div>

    <button className="rounded-full w-72 self-center text-lg font-semibold btn text-white bg-spotifyDarkGray border-2 border-spotifyGreen px-6 py-2">Submit</button>
          </div>
      </div>} />
  )
}

export default AddPlaylistModal