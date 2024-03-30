import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { InferGetStaticPropsType } from "next";
import useUsers from '@/hooks/useUsers';
import useSongs from '@/hooks/useSongs';
import Image from 'next/image';
import {format} from 'date-fns';
import Link from 'next/link';
import { FaClock, FaPlay, FaShuffle } from 'react-icons/fa6';
import { FaList, FaPause, FaPlusCircle } from 'react-icons/fa';
import { BsThreeDots } from "react-icons/bs";
import useListenedSong from '@/hooks/useListenedSong';
import { useDispatch, useSelector } from 'react-redux';
import { playMusicActions } from '@/contexts/PlayMusicContext';
type Props = {}

function SongPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
const router=useRouter();
const {songId}=router.query;
const {data}=useSongs(songId as string);
const songRef= useRef<HTMLAudioElement>(null);
const {data:userData}=useUsers(data?.artistId!);
const {data:listenedTimes}=useListenedSong(data?.id!);
const dispatch= useDispatch();
const isPlaying=useSelector((state:any)=>state.playmusic.isPlaying);

const handlePlay=()=>{
  dispatch(playMusicActions.startSong({songPath:data.musicPath, artists:[userData], imageUrl:data.songCover, songId:data.id, title:data.title}))
}

const songData= songRef.current;

  return (
    <div className='w-full h-full bg-spotifySpecificOpacityGreen'>
      {data && <>
      <div className="flex gap-6 p-4">
      <Image width={192} height={192} src={data.songCover} alt='cover' className='w-48 h-48 object-cover rounded-md'/>
<div className="flex flex-col gap-8">
  <p className="text-xs">Song</p>
  <p className='font-medium sm:text-2xl lg:text-6xl 2xl:text-8xl'>{data.title}</p>
  <div className="">
    {data && userData && <div className='flex gap-6  items-center'>
<Image width={48} height={48} alt='' className='rounded-full w-12 h-12 object-cover border-2 border-spotifyGreen' src={userData.profileImg}/>
<Link className='hover:font-medium hover:underline' href={`/users/${userData.id}`}>{userData.username}</Link>  
<p>{format(data.releaseDate as string, "do MMMM yyyy")}</p>
    </div>
    }
  </div>
</div>
      </div>
<div className="w-full bg-spotifyOpacityDarkGray">
  <div className="flex p-4 justify-between">
    <div className="flex gap-8">
      <button onClick={handlePlay} className=' bg-spotifyGreen p-4 rounded-full'>
        {isPlaying ? <FaPause className='text-black' size={18}/> :  <FaPlay className='text-black' size={18}/>}
      </button>
      <div className="flex gap-4">
        <button><FaShuffle size={30}/></button>
        <button><FaPlusCircle size={30}/></button>
        <button><BsThreeDots size={30}/></button>
      </div>
    </div>

    <button><FaList/></button>
  </div>
  <div className="flex p-4 mx-4 justify-between border-b-2 border-b-spotifyMediumGray m-0">
   <div className="flex gap-2">
    <p>#</p>
    <p>Title</p>
   </div>
    <p>Plays</p>
    <FaClock/>
  </div>
  <div className="flex p-3 mx-4 justify-between items-center">
    <div className="flex gap-6 items-center">
      <p className=' text-lg text-spotifyLightGray font-medium'>1</p>
      <div className="">
      <p>{data.title}</p>
      <p className='text-sm text-spotifyLightGray'>{userData && userData.username}</p>
      </div>
    </div>
    
      <p className=' text-spotifyLightGray'>{listenedTimes && listenedTimes}</p>
  
    <div className="">
     <audio ref={songRef} src={data.musicPath}></audio>
     {songData && <p className='text-spotifyLightGray'>{`${Math.floor(songData.duration/60) < 10 ? `0${Math.floor(songData.duration / 60)}` : Math.floor(songData.duration / 60)}:${Math.floor(songData.duration) < 10 ? `0${Math.floor(songData.duration)}` : Math.floor(songData.duration)}`}</p>}
    </div>
  </div>
</div>

      </>}
      
      </div>
  )
}

export default SongPage


export const getStaticProps= async ()=>{
  const fetchedData= await fetch('http://localhost:3000/api/songs');
  const songs=await fetchedData.json();

  return {
    props:{
      songs
    }
  }
  
}

export const getStaticPaths= async ()=>{
const fetchedData= await fetch('http://localhost:3000/api/songs');
const songs=await fetchedData.json();

const songsConvertedToParam=songs.map((song:any) => ({params: {songId: song.id}}));

return {
  paths: songsConvertedToParam,
  fallback:'blocking'
}

}