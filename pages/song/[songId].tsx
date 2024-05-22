import React, { useRef } from 'react';

import { format } from 'date-fns';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsThreeDots } from 'react-icons/bs';
import {
  FaList,
  FaPause,
  FaPlusCircle,
} from 'react-icons/fa';
import {
  FaClock,
  FaPlay,
  FaShuffle,
} from 'react-icons/fa6';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import SongItem from '@/components/home-page/items/SongItem';
import { playMusicActions } from '@/contexts/PlayMusicContext';
import useCurrentUser from '@/hooks/useCurrentUser';
import useListenedSong from '@/hooks/useListenedSong';
import useSongs from '@/hooks/useSongs';
import useUsers from '@/hooks/useUsers';
import useAdvertisement from '@/hooks/useAdvertisement';

type Props = {}

function SongPage({}) {
const router=useRouter();
const {songId}=router.query;
const {data}=useSongs(songId as string);
const {data:currentUserData}=useCurrentUser();
const showRight = useSelector((state:any)=>state.playmusic.showRightBar);
const {data:userData}=useUsers(data?.artistId!);
const {data:users}=useUsers();
const {data:advertisement}=useAdvertisement();
const {data:listenedTimes}=useListenedSong(data?.id!);
const dispatch= useDispatch();
const isPlaying=useSelector((state:any)=>state.playmusic.isPlaying);
const conditionalAdShow= currentUserData && !currentUserData.isSubscribed && (new Date().getTime() -  new Date(currentUserData.pastFromLastAds).getTime()) / 60000 >= 30;


const handlePlay=()=>{
  if(conditionalAdShow && currentUserData){
    
    dispatch(playMusicActions.startSong({songPath: advertisement.musicPath, imageUrl: advertisement.songCover, artists: ['Clonify'], title:advertisement.title, songId:advertisement.id}));
  }else{
if(data && userData){
  if(users){
    const artist = users && users.find((user: any) => user.id === data.artistId).username;
  console.log(users && users.find((user: any) => user.id === data.artistId));
  dispatch(playMusicActions.startSong({songCover:data.songCover, songLength:0, songPath:data.musicPath, title:data.title, artistList:[artist], songId:data.id}));
  }
}
  }
}


  return (
    <div className='w-full h-full bg-spotifySpecificOpacityGreen'>
      {data && <>
      <div className={`flex xl:items-start gap-6 p-4 ${showRight ? 'sm:flex-col xl:flex-row' : 'sm:flex-col lg:flex-row'}`}>
      <Image width={192} height={192} src={data.songCover} alt='cover' className='w-48 h-48 md:self-center object-cover rounded-md'/>
<div className="flex flex-col gap-6 xl:gap-8">
  <p className="text-xs">Song</p>
  <p className='font-medium sm:text-2xl lg:text-3xl 2xl:text-8xl'>{data.title}</p>
  <div className="">
    {data && userData && <div className='flex gap-6  items-center'>
<Image width={48} height={48} alt='' className='rounded-full w-12 h-12 object-cover border-2 border-spotifyGreen' src={userData.profileImg}/>
<Link className='hover:font-medium hover:underline' href={`/users/${userData.id}`}>{userData.username}</Link>  
<p className='lg:text-xs xl:text-base sm:text-base'>{format(data.releaseDate as string, "do MMMM yyyy")}</p>
    </div>
    }
  </div>
</div>
      </div>
<div className="w-full bg-spotifyOpacityDarkGray">
  <div className="flex  p-4 justify-between">
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
  <div className="sm:hidden md:flex p-4 mx-4 justify-between border-b-2 border-b-spotifyMediumGray m-0">
   <div className="flex gap-2">
    <p>#</p>
    <p>Title</p>
   </div>
    <p>Plays</p>
    <FaClock/>
  </div>
  {userData && listenedTimes && data &&
  <SongItem songId={data.id} artist={data.artistId} musicSource={data.musicPath} title={data.title}/>
  }
 
</div>

      </>}
      
      </div>
  )
}

export default SongPage


// export const getStaticProps= async ()=>{
//   const fetchedData= await fetch(`http://localhost:3000/api/songs`);
//   const songs=await fetchedData.json();

//   return {
//     props:{
//       songs
//     }
//   }
  
// }

// export const getStaticPaths= async ()=>{
// const fetchedData= await fetch(`http://localhost:3000/api/songs`);
// const songs=await fetchedData.json();

// const songsConvertedToParam=songs.map((song:any) => ({params: {songId: song.id}}));

// return {
//   paths: songsConvertedToParam,
//   fallback:'blocking'
// }

// }