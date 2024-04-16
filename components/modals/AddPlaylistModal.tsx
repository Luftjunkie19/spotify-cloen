import React, { useState } from 'react';

import { IoClose } from 'react-icons/io5';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import Select from 'react-tailwindcss-select';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';

import { playlistModalActions } from '@/contexts/PlayListModalContext';
import useCurrentUser from '@/hooks/useCurrentUser';
import useSongs from '@/hooks/useSongs';
import useStorage from '@/hooks/useStorage';

import Modal from './Modal';

type Props = {}

function AddPlaylistModal({}: Props) {
  const isOpen=useSelector((state:any)=>state.playlistModal.isShown);
  const [image, setImage] = useState<string | null>(null);
  const [playlistName, setPlaylistName] = useState('');
  const dispatch=useDispatch();
  const handleClose=()=>{
    dispatch(playlistModalActions.closeModal());
  }

const {data:songs}=useSongs();
const {data:user}=useCurrentUser();
const {uploadImage}=useStorage();
const [selectedSongs, setSelectedSongs] = useState<SelectValue | null>(null);

  const handleChange = (value: SelectValue) => {
    console.log(value);
        setSelectedSongs(value);
    };

  
    const selectImage = async (e:any) => {
    const selectedImage = e.target.files[0];
    
    const reader= new FileReader();

    
      reader.onload = (e) => {
      setImage(e.target?.result as string);
    }
    
    reader.readAsDataURL(selectedImage);
    const uploadResult = await uploadImage({path:`playlistCover/${user.id}/${playlistName}`, imageUrl:image});
    console.log(uploadResult);
    setImage(uploadResult);
  }



const options= songs && songs.map((song: any)=>{ return {value:song, label:song.title}});

  const createPlaylist = async () => {
    
    const playlistSongs = (selectedSongs as any).map((item:any) => item.value);
    console.log(playlistSongs);
    await fetch('api/playlist/create', {
      method: 'POST',
      body: JSON.stringify({ playlistName, imageUrl: image, creatorId: user.id, songs: playlistSongs }),
      headers:{
        'Content-Type':'application/json',
      }
    });
    handleClose();
  }
  

  return (
      <Modal body={<div className={`w-screen ${isOpen ? 'flex fixed' : 'hidden'} flex-col justify-center items-center h-screen top-0 left-0 bg-spotifyOpacityDarkGray`}>
      <div className={`rounded-lg ${isOpen ? 'flex z-[100]' : 'hidden'} flex-col p-6 gap-4 sm:w-full lg:w-3/5 max-w-lg w-full bg-spotifyMediumGray `}>
      <div className="flex justify-between">
        <p className=' text-xl font-medium'>Add playlist</p>
      <button onClick={handleClose}>
          <IoClose color="red" size={36}/>
        </button>
        </div>  
      
          <div className="flex flex-col gap-1">
<label htmlFor="">Playlist&apos;s name:</label>
<input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPlaylistName(e.target.value)} type="text" className='input max-w-sm' />
        </div>


  <div className="flex flex-col gap-1">
<label htmlFor="">Playlist&apos;s image:</label>
<input onChange={selectImage} accept='image/*' type="file" className="file-input file-input-bordered bg-spotifyGreen w-full max-w-xs" />
        </div>

        <div className="flex flex-col gap-1">
<label htmlFor="">Playlist&apos;s songs:</label>
{options && <Select  isMultiple isSearchable placeholder='Select songs' options={options} value={selectedSongs} onChange={handleChange} primaryColor={'indigo'}/>}
        </div>

    <button onClick={createPlaylist} className="rounded-full w-72 self-center text-lg font-semibold btn text-white bg-spotifyDarkGray border-2 border-spotifyGreen px-6 py-2">Submit</button>
          </div>
      </div>} />
  )
}

export default AddPlaylistModal