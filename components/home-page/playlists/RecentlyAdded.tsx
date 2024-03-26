/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { FaPlay } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

import SongSkeleton from '@/components/skeletons/SongSkeleton';
import { playMusicActions } from '@/contexts/PlayMusicContext';
import useSongs from '@/hooks/useSongs';
import useUsers from '@/hooks/useUsers';

type Props = {
  closedRight: boolean;
}

function RecentlyAdded({ closedRight }: Props) {
  const dispatch = useDispatch();
  const { data, isLoading } = useSongs();
  const { data: users, isLoading:usersLoading } = useUsers();
  const colourArray = ['bg-red-300', ' bg-yellow-500', 'bg-green-200', 'bg-blue-400', 'bg-purple-600', 'bg-pink-700', ' bg-red-700'];

  const handleSong = (song: any) => {
    const artist = users.find((userData: any) => userData.id === song.artistId)?.username;
    dispatch(playMusicActions.startSong({songCover:song.songCover, songLength:0, songPath:song.musicPath, title:song.title, artistList:[artist]}))
  }
  
  
  return (
    <>
      <p className='px-4 font-medium text-2xl'>Recently added songs:</p>
      <div className={`grid snap-always snap-mandatory gap-4 sm:auto-cols-[45%] md:auto-cols-[30%] sm:overflow-x-auto snap-inline sm:grid-flow-col xl:snap-none ${closedRight ? 'xl:grid-cols-5 2xl:grid-cols-7' : 'xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8'} px-4`}>
        {isLoading && new Array().fill(0, 0, 6).map((item, i) => <SongSkeleton key={i} />)}

      {!isLoading && data && data.slice(0, 7).map((song:any, i:any) => (<div className={`flex hover:bg-spotifyOpacityDarkGray py-2 px-1 transition-all duration-500 rounded-lg overflow-hidden cursor-pointer group snap-always snap-center flex-col relative top-0 left-0 gap-2`} key={i}>
        <div className="relative overflow-hidden top-0 left-0 w-full h-36">
          <Image fill src={song.songCover} alt='' className={`w-full h-36 rounded-lg object-cover ${colourArray[i]}`} />
          <div className="bg-spotifyOpacityDarkGray duration-500 transition-all group-hover:top-0 group-hover:opacity-100 opacity-0 absolute top-full left-0 w-full h-full"></div>
          <button onClick={()=>handleSong(song)} className="transition-all duration-500 group-hover:bottom-0 group-hover:opacity-100 absolute opacity-0 -bottom-full right-0 m-2 p-3 rounded-full bg-spotifyGreen">
            <FaPlay className="text-spotifyBlack group-hover:opacity-100 transition-all delay-150 opacity-0" size={20} />
</button>
        </div>
        <h2 className="sm:text-lg xl:text-base font-black lg:hidden">{song.title.trim().length >= 10 ? `${song.title.slice(0, 7)}...` : song.title}</h2>
        <Marquee className='sm:hidden lg:block' direction="right" pauseOnHover play={song.title.trim().length >= 15}>
          <h2 className='font-black sm:hidden lg:block'>{song.title}</h2>
        </Marquee>
        <p>{!usersLoading && users ? users.find((userData:any)=>userData.id === song.artistId).username : 'Loading...'}</p>
       </div>))}
    </div></>
  )
}

export default RecentlyAdded

