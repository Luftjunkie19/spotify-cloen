import useSongs from '@/hooks/useSongs';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa6';
import { InferGetStaticPropsType } from "next";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import useUsers from '@/hooks/useUsers';
import { useDispatch, useSelector } from 'react-redux';
import { playMusicActions } from '@/contexts/PlayMusicContext';
import SongManagmentBar from '@/components/SongManagmentBar';
import useCurrentUser from '@/hooks/useCurrentUser';

interface Props {}

function PlayedSongScreen({}: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();
      const songId = useSelector((state:any)=>state.playmusic.songId);
    const {data}=useSongs(songId as string);
    const {data:users}=useUsers();
    const {data:userData}=useCurrentUser();


    const handleLike= async ()=>{
      const fetchData= await fetch('/api/like', {
         method:'POST',
         body:JSON.stringify({songId:songId, likerId:userData && userData.id}),
         headers:{
             'Content-Type':'application/json'
         }
      });
    
      const response = await fetchData.json();
         
     }



    useEffect(()=>{
      if(!songId){
        router.push('/');
      }
    },[router, songId])
    
  return (
    <div className='w-screen h-screen py-6 px-2'>
        {data &&    
<div className='w-full h-full flex flex-col justify-between gap-3'>
    
    <div className="flex gap-4 lg:flex-row sm:flex-col">
    <Image className='rounded-lg w-64 h-64 sm:self-center lg:self-start' width={192} height={192} alt='' src={data.songCover}/>
      <div className="flex flex-col justify-center gap-2 px-2">
       <div className="flex gap-4  justify-between items-center">
        <p className='text-xl font-bold'>{data.title}</p>    
<button onClick={handleLike}>
  <FaCheckCircle className={userData && userData.favouriteSongs.includes(songId) ? 'text-spotifyGreen': 'text-white'} size={24}/>
</button>
       </div>
      <p>{users && users.find((user:any)=>user.id === data.artistId).username}</p>
      </div>
    </div>

</div>
        }


    </div>
  )
}

export default PlayedSongScreen



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