import React, { useState } from 'react';

import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { genres } from '@/assets/MusicGenres';
import { songModalActions } from '@/contexts/SongModalContext';
import useCurrentUser from '@/hooks/useCurrentUser';
import useStorage from '@/hooks/useStorage';

function AddSongModal() {
  const { data: user } = useCurrentUser();
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [songName, setSongName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [songGenre, setSongGenre] = useState<string | null>(null);
  const isVisible = useSelector((state: any) => state.songmodal.isShown);

  const {uploadImage}=useStorage();
  const selectImage = async (e:any) => {
    const selectedImage = e.target.files[0];
    const reader= new FileReader();

    
      reader.onload = (e) => {
      setImage(e.target?.result as string);
    }
    
    reader.readAsDataURL(selectedImage);
    const uploadResult = await uploadImage({path:`songCover/${user.id}/${songName}`, imageUrl:image as string});
    console.log(uploadResult);
        setAudioFile(uploadResult);
  }

  const selectAudio = async (e:any) => {
    const selectedAudio = e.target.files[0];
      const reader= new FileReader();

    
      reader.onload = (e) => {
      setAudioFile(e.target?.result as string);
    }
    
    reader.readAsDataURL(selectedAudio);
    const uploadResult = await uploadImage({path:`songs/${user.id}/${songName}`, imageUrl:selectedAudio});
console.log(uploadResult);
    setAudioFile(uploadResult);
    


  };


  const closeModal = () => {
    dispatch(songModalActions.closeModal());
  }

  const onClickSubmit = async () => {
    console.log(user);

   
    
   
    await fetch('/api/addSong', {
      method: 'POST',
      body: JSON.stringify({ image, songName, audioFile, artistId: user.id, songCover: image, genre: songGenre}),
      headers: {
        'Content-Type':'application/json',
      }
    });

    closeModal();
    
  }

  return (
      <div className={`w-screen ${isVisible ? '' : 'hidden'} flex flex-col justify-center items-center h-screen fixed z-[100] top-0 left-0 bg-spotifyOpacityDarkGray`}>
      <div className="flex flex-col p-8 gap-4 rounded-lg sm:w-full lg:w-3/5 max-w-xl w-full bg-spotifyMediumGray">
        <button onClick={closeModal} className=' self-end'>
          <IoClose color="red" size={36}/>
        </button>
        

        <p className=' text-center text-2xl font-bold'>Add a new Song !</p>

        <div className="flex flex-col gap-1">
<label htmlFor="">Song&apos;s name:</label>
<input onChange={(e)=>setSongName(e.target.value)} type="text" className='input max-w-sm' />
        </div>

              <div className="">     
          {image &&
          <Image className='w-16 h-16 rounded-lg' width={64} height={64} src={image} alt='image'/>
}

              <p>Song Cover:</p>
              <input onChange={selectImage} accept='image/*' type="file" className="file-input file-input-bordered bg-spotifyGreen w-full max-w-xs" />
        </div>
        
        <div className="">
          <p>Song genre:</p>
          <select defaultValue={songGenre as string} onChange={(e)=>setSongGenre(e.target.value)} className="select select-bordered w-full max-w-xs">
  <option disabled>Select music genre</option>
            {genres.map((item, i) => (<option value={item.genre as string} key={i}>{item.genre}</option>))}
</select>
        </div>

              <div className="">     
              <p>Audio file:</p>
              <input onChange={selectAudio} accept='audio/*' type="file" className="file-input file-input-bordered bg-spotifyGreen w-full max-w-xs" />
</div>

        <button onClick={onClickSubmit} className="btn self-center text-lg sm:w-11/12 md:w-1/2 hover:text-white hover:border-spotifyGreen lg:w-2/3 bg-spotifyGreen text-spotifyDarkGray" >Submit</button>
          </div>
    </div>
  )
}

export default AddSongModal