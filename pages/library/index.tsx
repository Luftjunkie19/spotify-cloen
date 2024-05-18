import React from 'react';

import Image from 'next/image';
import {
  FaClock,
  FaHeart,
  FaPlay,
} from 'react-icons/fa';
import {
  FaList,
  FaShuffle,
} from 'react-icons/fa6';

import SongItem from '@/components/home-page/items/SongItem';
import useCurrentUser from '@/hooks/useCurrentUser';
import useSongs from '@/hooks/useSongs';

type Props={}

export default function LibraryPage({}) {
  const { data } = useCurrentUser();
  const {data:songs}=useSongs();
  return (
    <div className='w-full min-h-screen bg-spotifyBlack'>
      {data && <>
      <div className="flex sm:flex-col md:flex-row px-6 py-4 gap-6 md:items-center">
          <Image  className='rounded-lg object-cover w-48 h-48' width={56} height={60} src={'https://i.pinimg.com/474x/e5/4f/19/e54f19d0ea4c93db35885d386d9b9677.jpg'} alt='width'/>
<div className="flex flex-col gap-4">
  <p>Playlist</p>
          <p className="lg:text-7xl md:text-4xl sm:text-3xl font-medium">Liked Songs</p>
         <div className="flex items-center gap-6">
         <div className="flex gap-2 items-center">
          {data.profileImg ? <Image src={data.profileImg} alt="" width={32} height={32} className="w-8 h-8 rounded-full"/> : null}
          <p className="text-sm">{data.username}</p>
         </div>


          <p className="text-sm">{data.favouriteSongs.length} Songs</p>
         </div>
</div>
      </div>

<div className="flex flex-col bg-spotifySpecificOpacityGreen h-screen">
          <div className="flex justify-between px-2 items-center">
            <div className="flex gap-6 p-2 items-center">
              <button className="p-5 rounded-full bg-spotifyGreen">
                <FaPlay className="text-spotifyDarkGray"/>
              </button>
              <div className="flex gap-4">     
              <button> <FaShuffle size={28} />  </button>
              </div>

            </div>
        <div>
          <button><FaList size={20} /></button>
        </div>
</div>

<div className="sm:hidden md:flex p-4 justify-between items-center border-b-2 border-spotifyLightGray">
<div className="flex items-center gap-2">
  <p>#</p>
  <p>Title</p>
</div>

<p>Date Added</p>

<FaClock size={20}/>
</div>
<div className="flex flex-col gap-2 py-4 px-2">
  {data.favouriteSongs.length === 0 && <div className='self-center flex flex-col items-center py-6 gap-4'>
  <FaHeart size={36}/>
  <p className='text-3xl font-medium'>Songs you like will appear here.</p>
  <p className='text-lg'>Save songs by tapping the check icon.</p>
  <button className='bg-white text-spotifyBlack font-medium px-6 py-3 rounded-full'>Find Songs</button>
  </div>}
  {data.favouriteSongs.map((item:any)=>(<>
  {songs && songs.find((song:any)=>song.id === item) && <SongItem releaseDate={songs.find((song: any) => song.id === item).releaseDate} artist={songs.find((song: any) => song.id === item).artistId} musicSource={songs.find((song: any) => song.id === item).musicPath} key={item} imageUrl={songs.find((song: any) => song.id === item).songCover} title={songs.find((song: any) => song.id === item).title} songId={songs.find((song:any)=>song.id === item).id}/>}
  </>))}
</div>


</div>
        
      </>
      }

    </div>
  )
}